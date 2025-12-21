"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { trackPageView } from "@/lib/analytics";

export default function SeniorExpertAdvisoryPage() {
  useEffect(() => {
    trackPageView("/services/senior-expert-advisory");
  }, []);

  return (
    <div>
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
          <div className="max-w-3xl">
            <h1 className="text-white mb-6 text-4xl sm:text-5xl font-bold">Senior Expert Advisory</h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Access retired EPC managers, PhDs, and industry specialists for risk mitigation and decision support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl font-bold">Advisory support</h2>
              <div className="space-y-4">
                {[
                  "Project recovery plans and turnaround strategy",
                  "Claims, contracts, and commercial risk guidance",
                  "Independent technical reviews and decision support",
                  "Mentoring for project teams and discipline leads",
                  "Executive reporting and stakeholder communication",
                ].map((t) => (
                  <div key={t} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-gray-900 mb-4 text-2xl font-semibold">How we engage</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Hourly advisory calls</li>
                <li>• Weekly steering reviews</li>
                <li>• On-site workshops and audits</li>
                <li>• Retainer support for critical projects</li>
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Book an Advisory Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
