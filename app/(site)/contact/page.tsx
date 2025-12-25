"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { trackPageView } from "@/lib/analytics";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackPageView("/contact");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from("contact_inquiries").insert({
      name: formData.name,
      company: formData.company || null,
      email: formData.email,
      phone: formData.phone || null,
      service: formData.service || null,
      message: formData.message,
    });

    if (!insertError) {
      setSuccess(true);
      setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setSuccess(false), 6000);
    } else {
      setError(insertError.message || "Failed to send message");
    }

    setLoading(false);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-4xl">
            <h1 className="text-white mb-6 text-4xl sm:text-5xl font-bold">Connect With Us</h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Share your requirements and we’ll connect you with the right consultant or software specialist.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl font-bold">Contact Details</h2>
              <p className="text-lg text-gray-600 mb-8">
                We respond quickly to consultation requests and software demo inquiries.
              </p>

              <div className="space-y-4 mb-10">
                <a
                  href="mailto:info@pipingelements.com"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-3" />
                  info@pipingelements.com
                </a>
                <a
                  href="tel:+971501680453"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"

                  <Phone className="h-5 w-5 mr-3" />
                  +971 50 168 0453
                </a>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3" />
                  Dubai, United Arab Emirates
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-gray-900 mb-3 text-2xl font-semibold">What happens next?</h3>
                <div className="space-y-3">
                  {["We review your request", "We match you with an expert", "We schedule a call/demo"].map((t) => (
                    <div key={t} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
              <h2 className="text-gray-900 mb-6 text-3xl font-bold">Send a Message</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-800">Thanks! Your message has been sent.</p>
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Name</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Company</label>
                    <input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Phone</label>
                    <input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="+971 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select a service</option>
                    <option value="Supply Chain & Procurement">Supply Chain & Procurement</option>
                    <option value="Engineering Consultancy">Engineering Consultancy</option>
                    <option value="Senior Expert Advisory">Senior Expert Advisory</option>
                    <option value="Software Solutions">Software Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
