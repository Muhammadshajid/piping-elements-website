// contact-submit/index.ts
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
serve(async (req) => {
  try {
    if (req.method !== "POST") return new Response("Only POST", { status: 405 });
    const body = await req.json();
    const { name, company, email, phone, service_needed, message } = body;
    if (!name || !email || !message) return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    const { data, error } = await supabase.from("contact_messages").insert([{ name, company, email, phone, service_needed, message }]).select().single();
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true, id: data.id }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
