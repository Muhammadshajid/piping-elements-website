"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Expert = {
  id: string;
  name: string;
  discipline: string | null;
  title: string | null;
  image_url: string | null;
};

export default function ExpertsCarousel() {
  const [experts, setExperts] = useState<Expert[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("experts")
        .select("id,name,discipline,title,image_url")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (data) setExperts(data as any);
    })();
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-2">Featured Experts</h2>
        <p className="text-slate-600">Connect with our senior advisory panel</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {experts.map((e) => (
            <div key={e.id} className="card overflow-hidden">
              <div className="h-40 bg-slate-200">
                {e.image_url ? (
                  <img src={e.image_url} alt={e.name} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{e.name}</h3>
                <p className="text-sm text-slate-600">
                  {e.title || e.discipline || "Expert"}
                </p>
              </div>
            </div>
          ))}

          {experts.length === 0 && (
            <div className="text-slate-500">No experts added yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
