// blog-update/index.ts
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
serve(async (req) => {
  try {
    if (req.method !== "PUT") return new Response("Only PUT", { status: 405 });
    const body = await req.json();
    const { id, ...rest } = body;
    if (!id) return new Response(JSON.stringify({ error: "id required" }), { status: 400 });
    const { data, error } = await supabase.from("blog_posts").update(rest).eq("id", id).select().single();
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, blog: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
