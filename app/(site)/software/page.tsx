"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { trackPageView } from "@/lib/analytics";

type SoftwareItem = {
  id: string;
  name: string;
  slug: string;
  short_desc: string | null;
  description: string | null;
  logo_url: string | null;
};

const fallback = [
  {
    name: "PipeCloud",
    slug: "pipecloud",
    short_desc: "Cloud-based project management and collaboration",
    logo_url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    name: "Pipesurf",
    slug: "pipesurf",
    short_desc: "Complete fabrication management from cutting to dispatch",
    logo_url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    name: "SpoolCAD",
    slug: "spoolcad",
    short_desc: "3D modeling, BOM generation, and ERP integration",
    logo_url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
];

export default function SoftwarePage() {
  const [items, setItems] = useState<SoftwareItem[]>([]);

  useEffect(() => {
    trackPageView("/software");
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("software_items")
        .select("id,name,slug,short_desc,description,logo_url")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setItems(data as any);
    })();
  }, []);

  const list = items.length ? items : (fallback as any);

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
            <h1 className="text-white mb-6 text-4xl sm:text-5xl font-bold">Software Solutions</h1>
            <p className="text-lg sm:text-xl text-gray-200">
              GCC-authorized software to streamline fabrication workflows from drawing to dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-gray-900 mb-6 text-3xl sm:text-4xl font-bold">What you get</h2>
              <div className="space-y-4">
                {[
                  "Fabrication control for spools, materials, welds, and QA/QC",
                  "Automated BOM generation and drawing outputs",
                  "ERP integration for procurement and inventory",
                  "Dashboards for productivity and progress tracking",
                ].map((t) => (
                  <div key={t} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-gray-900 mb-4 text-2xl font-semibold">Request a demo</h3>
              <p className="text-gray-600 mb-6">
                Tell us your fabrication workflow and we’ll suggest the best toolset.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Request Software Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl font-bold">Available Software</h2>
            <p className="text-lg sm:text-xl text-gray-600">Choose the right platform for your team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {list.map((s: any, idx: number) => (
              <div key={s.id || s.slug || idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  {/* User requested exception: keep listing images flexible (not forcing a specific image set) */}
                  {s.logo_url ? (
                    <img src={s.logo_url} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-gray-900 mb-3 text-xl font-semibold">{s.name}</h3>
                  {s.short_desc ? <p className="text-gray-600 mb-4">{s.short_desc}</p> : null}
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center"
                  >
                    Ask about pricing <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
