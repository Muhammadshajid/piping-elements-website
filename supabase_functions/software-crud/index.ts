// software-crud/index.ts
import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
serve(async (req) => {
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    if (req.method === "GET") {
      const { data, error } = await supabase.from("software_items").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ software: data }), { status: 200 });
    }
    const body = await req.json();
    if (action === "create") {
      const { data, error } = await supabase.from("software_items").insert([body]).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, item: data }), { status: 201 });
    }
    if (action === "update") {
      const { id, ...rest } = body;
      const { data, error } = await supabase.from("software_items").update(rest).eq("id", id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, item: data }), { status: 200 });
    }
    if (action === "delete") {
      const { id } = body;
      const { data, error } = await supabase.from("software_items").delete().eq("id", id).select().single();
      if (error) throw error;
      return new Response(JSON.stringify({ ok: true, deleted: data }), { status: 200 });
    }
    return new Response("Bad request", { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
