"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    const { error } = await supabase.from("contact_inquiries").insert([
      { message },
    ]);

    setLoading(false);

    if (error) {
      alert("Error sending message");
    } else {
      setMessage("");
      setSuccess("Message sent successfully!");
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="w-full border p-3 rounded"
            rows={5}
          />

          <button
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-600 text-center mt-2">
              {success}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
