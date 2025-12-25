"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { trackPageView } from "@/lib/analytics";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  slug: string;
  created_at: string;
};

const fallback = [
  {
    title: "Optimizing Supply Chain for EPC Projects in GCC",
    excerpt:
      "Learn how to streamline procurement processes and reduce costs in large-scale energy projects.",
    image_url:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    category: "Supply Chain",
  },
  {
    title: "The Future of Piping Fabrication Software",
    excerpt:
      "Discover how digital solutions are transforming fabrication workflows across the GCC region.",
    image_url:
      "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    category: "Digital Transformation",
  },
  {
    title: "Why Senior Advisory Matters in Complex Projects",
    excerpt:
      "Understanding the value of experienced engineering consultants in risk mitigation.",
    image_url:
      "https://images.unsplash.com/photo-1573165067541-4cd6d9837902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    category: "Advisory",
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    trackPageView("/blog");
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("id,title,excerpt,category,image_url,slug,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setPosts(data as any);
    })();
  }, []);

  const list = posts.length ? (posts as any) : (fallback as any);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-4xl">
            <h1 className="text-white mb-6 text-4xl sm:text-5xl font-bold">
              Insights &amp; Knowledge from Industry Experts
            </h1>
            <p className="text-lg sm:text-xl text-gray-200">
              Practical insights on procurement, engineering, execution, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {list.map((p: any, idx: number) => (
              <div key={p.id || idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-blue-600 text-sm mb-2">{p.category || ""}</p>
                  <h3 className="text-gray-900 mb-3 text-xl font-semibold">{p.title}</h3>
                  {p.excerpt ? <p className="text-gray-600 mb-4">{p.excerpt}</p> : null}
                 <Link
                   href={p.slug ? `/blog/${p.slug}` : "/contact"}
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center"
                    >

                    Read More <ArrowRight className="ml-2 h-4 w-4" />
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
