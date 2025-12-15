import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const revalidate = 60; // ISR (safe & fast)

export default async function BlogPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, created_at, image_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Insights & Blogs</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow rounded-xl overflow-hidden flex flex-col"
          >
            {/* ✅ STEP 4 — IMAGE */}
            {blog.image_url && (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold">
                {blog.title}
              </h2>

              <p className="text-gray-600 mt-2 flex-grow">
                {blog.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 font-medium"
                >
                  Read More →
                </Link>

                {/* ✅ STEP 5 — SHARE BUTTON */}
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/blog/${blog.slug}`
                      );
                      alert("Blog link copied!");
                    }
                  }}
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs?.length === 0 && (
        <p className="text-gray-500 mt-6">No blogs published yet.</p>
      )}
    </div>
  );
}
