"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Package,
  Compass,
  Users,
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
  slug?: string;
};

const fallbackExperts = [
  {
    name: "Dr. Rajesh Kumar",
    discipline: "Piping Engineering",
    expertise: "35+ years EPC experience in oil & gas piping design.",
    image: "https://images.unsplash.com/photo-1747811853874-c00a51195d54?w=400",
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
      .limit(5)
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
          name: e.name,
          discipline: e.discipline || e.title || "Expert",
          expertise: e.bio || "",
          image: e.image_url || "",
        }))
      : fallbackExperts;
  }, [experts]);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gray-900 text-white py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Engineering Intelligence & Student Mentoring
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Senior EPC expertise, advisory, and mentoring programs.
        </p>
        <Link
          href="/contact"
          className="px-8 py-3 bg-blue-600 rounded-md inline-block"
        >
          Talk to an Expert
        </Link>
      </section>

      {/* CORE SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {[
            {
              title: "Supply Chain & Procurement",
              Icon: Package,
            },
            {
              title: "Engineering Consultancy",
              Icon: Compass,
            },
            {
              title: "Senior Expert Advisory",
              Icon: Users,
            },
          ].map(({ title, Icon }) => (
            <div key={title} className="p-6 border rounded-lg text-center">
              <Icon className="h-10 w-10 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERT CAROUSEL */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Featured Experts</h2>
        <img
          src={carouselExperts[currentExpert]?.image}
          className="w-40 h-40 mx-auto rounded-full mb-4"
          alt=""
        />
        <h3 className="text-xl font-semibold">
          {carouselExperts[currentExpert]?.name}
        </h3>
        <p className="text-blue-600">
          {carouselExperts[currentExpert]?.discipline}
        </p>
        <p className="max-w-xl mx-auto text-gray-600 mt-3">
          {carouselExperts[currentExpert]?.expertise}
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() =>
              setCurrentExpert(
                (p) => (p - 1 + carouselExperts.length) % carouselExperts.length
              )
            }
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setCurrentExpert((p) => (p + 1) % carouselExperts.length)
            }
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* STUDENT MENTORING */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Student Mentoring</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Career guidance, technical training, and EPC exposure.
        </p>
        <Link
          href="/student-mentoring"
          className="px-8 py-3 bg-white text-blue-600 rounded-md"
        >
          Explore Mentoring
        </Link>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Need guidance from senior EPC professionals?
        </h2>
        <Link
          href="/contact"
          className="px-8 py-3 bg-blue-600 rounded-md"
        >
          Talk to an Expert
        </Link>
      </section>
    </div>
  );
}
