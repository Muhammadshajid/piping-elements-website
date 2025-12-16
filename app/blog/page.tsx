import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const dynamic = "force-dynamic"; // ✅ ALWAYS fresh
export const revalidate = 0;            // ✅ disable ISR cache

export default async function BlogPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, created_at, image_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-red-600">Failed to load blogs.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Insights & Blogs</h1>
      <p className="text-gray-600 mb-10">
        Expert knowledge, industry updates, and insights
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            {blog.image_url ? (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm flex-grow">
                {blog.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>

                {/* SHARE */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/blog/${blog.slug}`
                    );
                    alert("Blog link copied!");
                  }}
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  Share
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(blog.created_at).toLocaleDateString()}
              </p>
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
