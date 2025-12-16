import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const revalidate = 0; // disable cache while fixing

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // SERVER ONLY
);

export default async function BlogPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, created_at, image_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div className="p-10 text-red-600">
        Failed to load blogs
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* TITLE */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Insights & Blogs
        </h1>
        <p className="text-gray-600 mt-2">
          Expert knowledge, industry updates, and insights
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group"
          >
            <article className="bg-white shadow rounded-xl overflow-hidden h-full hover:shadow-lg transition">
              {/* IMAGE */}
              {blog.image_url ? (
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* CONTENT */}
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-lg font-semibold group-hover:text-blue-600">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mt-2 text-sm flex-grow">
                  {blog.excerpt}
                </p>

                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-blue-600 font-medium">
                    Read More →
                  </span>
                  <span className="text-gray-400">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="text-gray-500 mt-10">
          No blogs published yet.
        </p>
      )}
    </div>
  );
}
