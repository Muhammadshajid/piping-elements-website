import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

/**
 * IMPORTANT
 * This page runs on the SERVER.
 * We must create Supabase client here using env vars.
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Disable ISR while debugging listing issues
export const revalidate = 0;

export default async function BlogPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, created_at, image_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* PAGE TITLE */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Insights & Blogs
        </h1>
        <p className="text-gray-600 mt-2">
          Expert knowledge, industry updates, and insights
        </p>
      </div>

      {/* ERROR STATE */}
      {error && (
        <p className="text-red-500">
          Failed to load blogs. Please try again later.
        </p>
      )}

      {/* BLOG GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <article
            key={blog.id}
            className="bg-white shadow rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition"
          >
            {/* BLOG IMAGE */}
            {blog.image_url ? (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* CONTENT */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold leading-snug">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2 flex-grow">
                {blog.excerpt}
              </p>

              {/* FOOTER */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>

                <div className="flex items-center gap-4">
                  <span className="text-gray-400">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>

                  {/* SHARE BUTTON */}
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/blog/${blog.slug}`
                        );
                        alert("Blog link copied!");
                      }
                    }}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* EMPTY STATE */}
      {blogs?.length === 0 && !error && (
        <p className="text-gray-500 mt-10">
          No blogs published yet.
        </p>
      )}
    </div>
  );
}
