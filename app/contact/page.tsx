"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("contact_inquiries")
      .insert([{ name, email, message }]);

    setLoading(false);

    if (error) {
      alert("Something went wrong");
    } else {
      alert("Message sent successfully");
      setName("");
      setEmail("");
      setMessage("");
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-2 bg-white rounded-xl shadow p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded-lg p-4 w-full"
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-lg p-4 w-full"
            />
          </div>

          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            className="border rounded-lg p-4 w-full mb-6"
          />

          <button
            disabled={loading}
            className="btn-primary w-full py-4 text-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* SIDE CARD */}
        <div className="bg-white rounded-xl shadow p-8 h-fit">
          <h3 className="text-xl font-semibold mb-2">
            Need expert guidance?
          </h3>
          <p className="text-gray-600 mb-6">
            Leave your message. We’ll respond shortly.
          </p>

          <a href="/services" className="btn-outline w-full text-center block">
            Explore Services
          </a>
        </div>

      </div>
    </section>
  );
}
