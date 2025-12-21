"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("newsletter_subscriptions")
      .insert({ email });

    if (!insertError) {
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 5000);
    } else {
      // Unique constraint violation in Postgres / Supabase
      const msg = insertError.message || "Failed to subscribe";
      if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
        setError("You are already subscribed.");
      } else {
        setError(msg);
      }
    }

    setLoading(false);
  }

  return (
    <div className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-white mb-4 text-3xl sm:text-4xl font-bold">Stay Updated</h2>
          <p className="text-xl text-blue-100">
            Subscribe to our newsletter for industry insights and updates
          </p>
        </div>

        {success && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center text-green-800">
              <CheckCircle className="h-5 w-5 mr-2" />
              <p>Successfully subscribed! Thank you for joining us.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-3 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
