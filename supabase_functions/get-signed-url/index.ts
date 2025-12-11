// get-signed-url/index.ts
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
serve(async (req) => {
  try {
    if (req.method !== "POST") return new Response("Only POST", { status: 405 });
    const body = await req.json();
    const { bucket = "website-assets", folder = "uploads", name } = body;
    if (!name) return new Response(JSON.stringify({ error: "name required" }), { status: 400 });
    const path = `${folder}/${crypto.randomUUID()}-${name}`;
    const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path, 300);
    if (error) throw error;
    return new Response(JSON.stringify({ uploadUrl: data.signedUploadUrl, path }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
