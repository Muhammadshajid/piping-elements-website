"use client";

import { supabase } from "@/lib/supabaseClient";

/**
 * Lightweight page-view tracker (writes to `page_views`).
 * Fails silently so it never breaks the UI.
 */
export async function trackPageView(page: string) {
  try {
    await supabase.from("page_views").insert({
      page,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
  } catch {
    // no-op
  }
}
