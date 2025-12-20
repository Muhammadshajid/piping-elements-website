"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setSent(false);
    if (!message.trim()) {
      setError("Please type a message.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("chat_messages").insert({
      name: name || null,
      email: email || null,
      message: message.trim(),
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("");
      setSent(true);
    }
    setLoading(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full px-4 py-3 shadow-lg bg-[var(--pe-primary)] text-white"
        >
          Chat
        </button>
      )}

      {open && (
        <div className="w-[320px] rounded-2xl shadow-xl border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--pe-primary)] text-white">
            <div className="font-semibold">Piping Elements Chat</div>
            <button onClick={() => setOpen(false)} className="opacity-90 hover:opacity-100">
              X
            </button>
          </div>

          <div className="p-4 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="w-full border rounded-lg px-3 py-2 text-sm min-h-[90px]"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
            {sent && <p className="text-sm text-green-600">Sent. We'll reply soon.</p>}

            <button
              disabled={loading}
              onClick={submit}
              className="w-full btn-primary"
            >
              {loading ? "Sending..." : "Send"}
            </button>

            <p className="text-[11px] text-gray-500">
              This chat saves your message for the team (not live support).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
