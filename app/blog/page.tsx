import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const revalidate = 60; // ISR (safe & fast)

export default async function BlogPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Insights & Blogs</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold">
              {blog.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {blog.excerpt}
            </p>

            <Link
              href={`/blog/${blog.slug}`}
              className="text-blue-600 mt-4 inline-block"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      {blogs?.length === 0 && (
        <p className="text-gray-500 mt-6">No blogs published yet.</p>
      )}
    </div>
  );
}
