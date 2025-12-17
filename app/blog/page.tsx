import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPage() {
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, created_at, image_url")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Insights & Blogs
      </h1>
      <p className="text-gray-600 mb-10">
        Expert knowledge, industry updates, and insights
      </p>

      {error && (
        <p className="text-red-500">
          Failed to load blogs.
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="block bg-white shadow rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition"
          >
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

            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2 flex-grow">
                {blog.excerpt}
              </p>

             <span className="mt-4 text-sm text-black font-medium">
             Read more →
            </span>


              <span className="mt-2 text-xs text-gray-500">
                Share
              </span>
            </div>
          </Link>
        ))}
      </div>

      {blogs?.length === 0 && !error && (
        <p className="text-gray-500 mt-10">
          No blogs published yet.
        </p>
      )}
    </div>
  );
}
