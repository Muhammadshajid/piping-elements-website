"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase
      .from("contact_inquiries")
      .insert([
        {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          service: formData.get("service"),
          message: formData.get("message"),
        },
      ]);

    setLoading(false);

    if (!error) {
      setSuccess(true);
      form.reset();
    } else {
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-xl mx-auto px-6">
        <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

        {success && (
          <p className="mb-4 text-green-600">
            ✅ Message sent successfully
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Name" required className="input" />
          <input name="email" placeholder="Email" required className="input" />
          <input name="phone" placeholder="Phone" className="input" />
          <input name="company" placeholder="Company" className="input" />

          <select name="service" className="input">
            <option>Supply Chain</option>
            <option>Engineering Consultancy</option>
            <option>Expert Advisory</option>
            <option>Software</option>
          </select>

          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className="input"
          />

          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Sending..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}
