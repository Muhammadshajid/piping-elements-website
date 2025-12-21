"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { trackPageView } from "@/lib/analytics";

export default function EngineeringConsultancyPage() {
  useEffect(() => {
    trackPageView("/services/engineering-consultancy");
  }, []);

  return (
    <div>
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
            <h1 className="text-white mb-6 text-4xl sm:text-5xl font-bold">Engineering Consultancy</h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Multi-discipline engineering guidance for planning, fabrication, and execution across complex projects.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl font-bold">Where we help</h2>
              <div className="space-y-4">
                {[
                  "Piping design review & optimization",
                  "Fabrication planning and constructability checks",
                  "Welding, QA/QC, and ITP support",
                  "Site execution sequencing and work-pack strategy",
                  "Interface management and technical clarifications",
                ].map((t) => (
                  <div key={t} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-gray-900 mb-4 text-2xl font-semibold">Deliverables</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Engineering review notes + recommendations</li>
                <li>• Constructability and spool split proposals</li>
                <li>• QA/QC plans aligned to project specs</li>
                <li>• Risk register items and mitigation actions</li>
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Talk to an Engineer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
