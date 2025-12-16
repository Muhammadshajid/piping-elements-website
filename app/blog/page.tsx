import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// Disable ISR while fixing (can enable later)
export const revalidate = 0;

// ✅ SERVER-SIDE Supabase client (SAFE)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function BlogPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, created_at, image_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  // ❌ Error state
  if (error) {
    console.error("Blog fetch error:", error);
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-red-600">Failed to load blogs.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Insights & Blogs
        </h1>
        <p className="text-gray-600 mt-2">
          Expert knowledge, industry updates, and insights
        </p>
      </div>

      {/* BLOG GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <article
            key={blog.id}
            className="bg-white shadow rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition"
          >
            {/* IMAGE */}
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

                <span className="text-gray-400">
                  {new Date(blog.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* EMPTY STATE */}
      {blogs?.length === 0 && (
        <p className="text-gray-500 mt-10">
          No blogs published yet.
        </p>
      )}
    </div>
  );
}
