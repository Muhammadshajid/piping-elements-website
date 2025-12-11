// blog-create/index.ts
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
serve(async (req) => {
  try {
    if (req.method !== "POST") return new Response("Only POST", { status: 405 });
    const body = await req.json();
    const { title, slug, excerpt, content, cover_image, tags = [], is_published = false } = body;
    if (!title || !slug) return new Response(JSON.stringify({ error: "title & slug required" }), { status: 400 });
    const { data, error } = await supabase.from("blog_posts").insert([{ title, slug, excerpt, content, cover_image, tags, is_published }]).select().single();
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, blog: data }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
