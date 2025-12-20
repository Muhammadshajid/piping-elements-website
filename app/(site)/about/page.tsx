"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Award, Target, Users, CheckCircle } from "lucide-react";
import { trackPageView } from "@/lib/analytics";

export default function AboutPage() {
  useEffect(() => {
    trackPageView("/about");
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092334651-ddf26d9a09d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6 text-4xl sm:text-5xl font-bold">About Piping Elements</h1>
            <p className="text-lg sm:text-xl text-gray-200">
              We are a senior-level advisory and solutions firm supporting EPC, oil &amp; gas, and fabrication
              companies across the GCC and India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To deliver engineering intelligence, procurement excellence, and digital innovation to help
                contractors execute complex projects on time and on budget.
              </p>
              <div className="space-y-4">
                {["Senior EPC expertise on demand", "Supply chain optimization across GCC", "Authorized software for fabrication teams"].map(
                  (t) => (
                    <div key={t} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{t}</p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["GCC + India Presence", "Retired Leaders", "EPC & Fabrication", "Digital Tools"].map((k) => (
                  <div key={k} className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="text-blue-600 font-semibold">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl font-bold">What We Stand For</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Practical consulting backed by decades of real project execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {["Excellence", "Integrity", "Results"].map((t, i) => {
              const Icon = [Award, Users, Target][i];
              return (
                <div key={t} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2 text-xl font-semibold">{t}</h3>
                  <p className="text-gray-600">
                    {t === "Excellence"
                      ? "Delivering high-quality guidance and execution support."
                      : t === "Integrity"
                        ? "Transparent, ethical, and aligned with your project goals."
                        : "Focused on measurable impact: cost, time, quality, and risk."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6 text-3xl sm:text-4xl font-bold">Let’s Work Together</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Speak with our team to explore how we can support your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
