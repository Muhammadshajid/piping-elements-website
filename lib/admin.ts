import { supabase } from "@/lib/supabaseClient";

export async function isAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (error) return false;
  return !!data;
}

/**
 * Redirects to /login if not logged in, or if user isn't in admin_users.
 */
export async function requireAdmin(router: { push: (path: string) => void }) {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    router.push("/login");
    return { ok: false, userId: null as string | null };
  }

  const ok = await isAdmin(user.id);
  if (!ok) {
    await supabase.auth.signOut();
    router.push("/login");
    return { ok: false, userId: null as string | null };
  }

  return { ok: true, userId: user.id };
}
