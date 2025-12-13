import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function BlogPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10">Insights & Blogs</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs?.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl shadow p-6">
              <p className="text-sm text-blue-600">{blog.category}</p>
              <h2 className="font-semibold text-lg mt-2">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.excerpt}</p>

              <Link
                href={`/blog/${blog.slug}`}
                className="text-blue-600 mt-4 inline-block"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
