"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Package, Compass, Users, ArrowRight, CheckCircle } from "lucide-react";
import { trackPageView } from "@/lib/analytics";

export default function ServicesPage() {
  useEffect(() => {
    trackPageView("/services");
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092918367-4c1d4d0ef5b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="text-white mb-6 text-4xl sm:text-5xl font-bold">Our Services</h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Senior consulting and execution support for EPC, oil &amp; gas, and fabrication companies.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Supply Chain & Procurement",
                desc:
                  "Material sourcing, vendor management, logistics coordination, and procurement strategy for EPC projects.",
                bullets: [
                  "Vendor sourcing & pre-qualification",
                  "Procurement scheduling & expediting",
                  "Cost optimization and benchmarking",
                ],
                href: "/services/supply-chain",
                Icon: Package,
              },
              {
                title: "Engineering Consultancy",
                desc:
                  "Multi-discipline engineering guidance for planning, fabrication, and execution across complex projects.",
                bullets: [
                  "Piping design review & optimization",
                  "Constructability and fabrication planning",
                  "QA/QC, welding, and inspection support",
                ],
                href: "/services/engineering-consultancy",
                Icon: Compass,
              },
              {
                title: "Senior Expert Advisory",
                desc:
                  "Access retired EPC managers, PhDs, and industry specialists for risk mitigation and decision support.",
                bullets: ["Claims & contract strategy", "Project recovery plans", "Senior reviews and mentorship"],
                href: "/services/senior-expert-advisory",
                Icon: Users,
              },
            ].map(({ title, desc, bullets, href, Icon }) => (
              <div
                key={title}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-3 text-2xl font-semibold">{title}</h3>
                <p className="text-gray-600 mb-6">{desc}</p>
                <div className="space-y-3 mb-8">
                  {bullets.map((b) => (
                    <div key={b} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{b}</p>
                    </div>
                  ))}
                </div>
                <Link href={href} className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6 text-3xl sm:text-4xl font-bold">Ready to start?</h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Tell us about your project and we’ll connect you with the right expert.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Request Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
