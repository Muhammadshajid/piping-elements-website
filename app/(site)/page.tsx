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
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  image_url: string | null;
  slug: string;
};

const fallbackExperts = [
  {
    name: "Dr. Rajesh Kumar",
    discipline: "Piping Engineering",
    expertise:
      "35+ years in EPC projects, specializing in oil & gas piping design and fabrication.",
    image:
      "https://images.unsplash.com/photo-1747811853874-c00a51195d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Ahmed Al-Mazrouei",
    discipline: "Project Controls",
    expertise: "Former EPC manager with expertise in scheduling, cost control, and procurement.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Williams",
    discipline: "QA/QC & Welding",
    expertise: "PhD in materials science, 25+ years in quality assurance for energy sector.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "Mohammed Al-Harthi",
    discipline: "Structural Engineering",
    expertise: "Retired structural engineering lead with GCC mega-project experience.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
];

const fallbackBlogPosts = [
  {
    title: "Optimizing Supply Chain for EPC Projects in GCC",
    excerpt:
      "Learn how to streamline procurement processes and reduce costs in large-scale energy projects.",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Supply Chain",
  },
  {
    title: "The Future of Piping Fabrication Software",
    excerpt:
      "Discover how digital solutions are transforming fabrication workflows across the GCC region.",
    image:
      "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Digital Transformation",
  },
  {
    title: "Why Senior Advisory Matters in Complex Projects",
    excerpt: "Understanding the value of experienced engineering consultants in risk mitigation.",
    image:
      "https://images.unsplash.com/photo-1573165067541-4cd6d9837902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Advisory",
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
    (async () => {
      const { data } = await supabase
        .from("experts")
        .select("id,name,discipline,title,bio,image_url")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (data) setExperts(data as any);
    })();

    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("id,title,excerpt,category,image_url,slug")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (data) setPosts(data as any);
    })();
  }, []);

  const carouselExperts = useMemo(() => {
    if (experts.length === 0) {
      return fallbackExperts.map((e, idx) => ({
        key: `fallback-${idx}`,
        name: e.name,
        discipline: e.discipline,
        expertise: e.expertise,
        image: e.image,
      }));
    }
    return experts.map((e) => ({
      key: e.id,
      name: e.name,
      discipline: e.discipline || e.title || "Expert",
      expertise: e.bio || "",
      image: e.image_url || "",
    }));
  }, [experts]);

  useEffect(() => {
    if (carouselExperts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentExpert((prev) => (prev + 1) % carouselExperts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselExperts.length]);

  const nextExpert = () => setCurrentExpert((prev) => (prev + 1) % carouselExperts.length);
  const prevExpert = () =>
    setCurrentExpert((prev) => (prev - 1 + carouselExperts.length) % carouselExperts.length);

  const heroBg =
    "https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl sm:text-5xl font-bold">
              Engineering Intelligence | Supply Chain Expertise | Digital Innovation
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8">
              Supporting EPC, oil &amp; gas, and fabrication companies with senior-level consulting,
              end-to-end supply chain solutions, and GCC-authorized software for piping fabrication.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Explore Services
              </Link>
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Verticals Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl font-bold">
              Our Core Verticals
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for the energy and EPC sector
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Supply Chain & Procurement",
                desc: "Efficient material sourcing, vendor management, and project support.",
                href: "/services/supply-chain",
                Icon: Package,
              },
              {
                title: "Engineering Consultancy",
                desc: "Multi-discipline engineering guidance for planning, fabrication, and execution.",
                href: "/services/engineering-consultancy",
                Icon: Compass,
              },
              {
                title: "Senior Expert Advisory",
                desc: "Access retired EPC managers, PhDs, and industry specialists.",
                href: "/services/senior-expert-advisory",
                Icon: Users,
              },
].map(({ title, desc, href, Icon }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-3 text-xl font-semibold">{title}</h3>
                <p className="text-gray-600 mb-4">{desc}</p>
                <Link href={href} className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Piping Elements */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl font-bold">
              Why Piping Elements?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted expertise and comprehensive solutions for complex energy projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: "Senior Expertise",
                desc: "Access to retired EPC leaders and industry PhDs with decades of experience.",
                Icon: Award,
              },
              {
                title: "End-to-End Solutions",
                desc: "From procurement to engineering to digital tools—complete project support.",
                Icon: Target,
              },
              {
                title: "Trusted by Contractors",
                desc: "Proven track record with Tier-1, 2, and 3 contractors across GCC.",
                Icon: CheckCircle,
              },
              {
                title: "Authorized Software Partner",
                desc: "GCC-authorized distributor for leading piping fabrication software.",
                Icon: Code,
              },
            ].map(({ title, desc, Icon }) => (
              <div key={title} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experts Carousel */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl font-bold">Featured Experts</h2>
            <p className="text-lg sm:text-xl text-gray-600">Connect with our senior advisory panel</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {carouselExperts[currentExpert]?.image ? (
                  <img
                    src={carouselExperts[currentExpert].image}
                    alt={carouselExperts[currentExpert].name}
                    className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gray-200" />
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-gray-900 mb-2 text-2xl font-semibold">
                    {carouselExperts[currentExpert]?.name}
                  </h3>
                  <p className="text-blue-600 mb-4">{carouselExperts[currentExpert]?.discipline}</p>
                  {carouselExperts[currentExpert]?.expertise ? (
                    <p className="text-gray-600 mb-6">{carouselExperts[currentExpert]?.expertise}</p>
                  ) : null}
                  <Link
                    href="/contact"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </div>

            {carouselExperts.length > 1 ? (
              <>
                <button
                  onClick={prevExpert}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
                  aria-label="Previous expert"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextExpert}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
                  aria-label="Next expert"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                </button>

                <div className="flex justify-center gap-2 mt-6">
                  {carouselExperts.map((_, index) => (
                    <button
                      key={carouselExperts[index].key}
                      onClick={() => setCurrentExpert(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentExpert ? "bg-blue-600 w-8" : "bg-gray-300"
                      }`}
                      aria-label={`Go to expert ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Student Mentoring Overview */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white mb-6">Empowering the Next Generation</h2>
              <p className="text-xl text-blue-100 mb-6">
                Our student mentoring programs provide comprehensive training and guidance for
                students and young professionals looking to build successful careers in the oil & gas
                and EPC industry.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-blue-50">
                    <span className="text-white">Technical Training:</span> Piping engineering, CAD
                    tools, and industry standards
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-blue-50">
                    <span className="text-white">Career Guidance:</span> Resume building, interview
                    prep, and industry connections
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-200 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-blue-50">
                    <span className="text-white">Practical Experience:</span> Real project
                    exposure and hands-on learning
                  </p>
                </div>
              </div>
              <Link
                to="/student-mentoring"
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                Explore Mentoring Programs
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
                <div className="text-4xl mb-2">🎓</div>
                <h3 className="text-white mb-2">Foundation Program</h3>
                <p className="text-blue-100">For Engineering Students</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
                <div className="text-4xl mb-2">💼</div>
                <h3 className="text-white mb-2">Career Launch</h3>
                <p className="text-blue-100">Job-Ready Training</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="text-white mb-2">Professional Growth</h3>
                <p className="text-blue-100">For Young Engineers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center">
                <div className="text-4xl mb-2">🌟</div>
                <h3 className="text-white mb-2">One-on-One Mentoring</h3>
                <p className="text-blue-100">Personalized Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Insights & Blogs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Latest Insights & Blog</h2>
            <p className="text-xl text-gray-600">
              Expert knowledge and industry updates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    className="text-blue-600 hover:text-blue-700 inline-flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-block px-8 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Explore More Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">Need guidance from senior EPC professionals?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect with our expert advisory panel for personalized support on your projects.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </div>


{/* Latest Insights */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4 text-3xl sm:text-4xl font-bold">Latest Insights &amp; Blog</h2>
            <p className="text-lg sm:text-xl text-gray-600">Expert knowledge and industry updates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(posts.length ? posts : (fallbackBlogPosts as any)).map((post: any, idx: number) => {
              const title = post.title;
              const category = post.category || "";
              const excerpt = post.excerpt || post.excerpt;
              const image = post.image_url || post.image;
              const href = posts.length ? `/blog#${post.slug}` : "/blog";
              return (
                <div key={posts.length ? post.id : idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    {image ? <img src={image} alt={title} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="p-6">
                    <p className="text-blue-600 text-sm mb-2">{category}</p>
                    <h3 className="text-gray-900 mb-3 text-xl font-semibold">{title}</h3>
                    {excerpt ? <p className="text-gray-600 mb-4">{excerpt}</p> : null}
                    <Link href={href} className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6 text-3xl sm:text-4xl font-bold">
            Need guidance from senior EPC professionals?
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Connect with our expert advisory panel for personalized support on complex projects.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </div>
  );
}
