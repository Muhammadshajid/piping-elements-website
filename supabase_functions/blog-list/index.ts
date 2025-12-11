// blog-list/index.ts
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
serve(async (_) => {
  try {
    const { data, error } = await supabase.from("blog_posts").select("id,title,slug,excerpt,cover_image,created_at").eq("is_published", true).order("created_at", { ascending: false });
    if (error) throw error;
    return new Response(JSON.stringify({ blogs: data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
