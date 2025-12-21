"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Package,
  Compass,
  Users,
  Code,
  Award,
  Target,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { trackPageView } from "@/lib/analytics";

type Expert = {
  id: string;
  name: string;
  discipline: string | null;
  title: string | null;
  bio: string | null;
  image_url: string | null;
};

type BlogPost = {
  id?: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  image_url?: string | null;
  image?: string;
  slug?: string;
};

const fallbackExperts = [
  {
    name: "Dr. Rajesh Kumar",
    discipline: "Piping Engineering",
    expertise: "35+ years EPC experience in oil & gas piping design.",
    image: "https://images.unsplash.com/photo-1747811853874-c00a51195d54?w=400",
  },
  {
    name: "Ahmed Al-Mazrouei",
    discipline: "Project Controls",
    expertise: "Former EPC manager with cost & planning expertise.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  },
];

const fallbackBlogPosts: BlogPost[] = [
  {
    title: "Optimizing Supply Chain for EPC Projects",
    excerpt: "How to streamline procurement and logistics.",
    category: "Supply Chain",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800",
  },
  {
    title: "Why Senior Advisory Matters",
    excerpt: "Reducing project risks through expert guidance.",
    category: "Advisory",
    image: "https://images.unsplash.com/photo-1573165067541-4cd6d9837902?w=800",
  },
  {
    title: "Future of Piping Engineering",
    excerpt: "Digital transformation in EPC workflows.",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?w=800",
  },
];

export default function HomePage() {
  useEffect(() => {
    trackPageView("/");
  }, []);

  const [experts, setExperts] = useState<Expert[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentExpert, setCurrentExpert] = useState(0);

  useEffect(() => {
    supabase
      .from("experts")
      .select("id,name,discipline,title,bio,image_url")
      .eq("published", true)
      .limit(6)
      .then(({ data }) => data && setExperts(data));

    supabase
      .from("blogs")
      .select("id,title,excerpt,category,image_url,slug")
      .eq("published", true)
      .limit(3)
      .then(({ data }) => data && setPosts(data));
  }, []);

  const carouselExperts = useMemo(() => {
    return experts.length
      ? experts.map((e) => ({
          key: e.id,
          name: e.name,
          discipline: e.discipline || e.title || "Expert",
          expertise: e.bio || "",
          image: e.image_url || "",
        }))
      : fallbackExperts.map((e, i) => ({ key: i, ...e }));
  }, [experts]);

  const blogData = posts.length ? posts : fallbackBlogPosts;

  return (
    <div>
      {/* HERO */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">
          Engineering Intelligence & Student Mentoring
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Senior EPC expertise, mentoring & advisory services
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-blue-600 rounded-md"
        >
          Talk to an Expert
        </Link>
      </section>

      {/* EXPERTS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Featured Experts</h2>
          <img
            src={carouselExperts[currentExpert]?.image}
            className="w-40 h-40 rounded-full mx-auto mb-4"
            alt=""
          />
          <h3 className="text-xl font-semibold">
            {carouselExperts[currentExpert]?.name}
          </h3>
          <p className="text-blue-600">
            {carouselExperts[currentExpert]?.discipline}
          </p>
          <p className="text-gray-600 max-w-xl mx-auto mt-3">
            {carouselExperts[currentExpert]?.expertise}
          </p>

          <div className="flex justify-center gap-6 mt-6">
            <button onClick={() =>
              setCurrentExpert((p) => (p - 1 + carouselExperts.length) % carouselExperts.length)
            }>
              <ChevronLeft />
            </button>
            <button onClick={() =>
              setCurrentExpert((p) => (p + 1) % carouselExperts.length)
            }>
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* STUDENT MENTORING */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Student Mentoring Programs</h2>
        <p className="max-w-3xl mx-auto mb-6">
          Technical training, career guidance & EPC exposure.
        </p>
        <Link
          href="/student-mentoring"
          className="inline-block px-8 py-3 bg-white text-blue-600 rounded-md"
        >
          Explore Mentoring
        </Link>
      </section>

      {/* BLOGS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest Insights & Blog
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogData.map((post, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md">
                <img
                  src={post.image_url || post.image}
                  className="h-48 w-full object-cover"
                  alt=""
                />
                <div className="p-6">
                  <p className="text-blue-600 text-sm">{post.category}</p>
                  <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                  <Link href="/blog" className="text-blue-600 inline-flex mt-4">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Need guidance from senior EPC professionals?
        </h2>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-blue-600 rounded-md"
        >
          Talk to an Expert
        </Link>
      </section>
    </div>
  );
}
