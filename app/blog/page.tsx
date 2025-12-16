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
    return <p className="p-10 text-red-600">Failed to load blogs</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Insights & Blogs</h1>
      <p className="text-gray-600 mb-8">
        Expert knowledge, industry updates, and insights
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white shadow rounded-xl overflow-hidden"
          >
            {blog.image_url ? (
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}

            <div className="p-6">
              <h2 className="font-semibold text-lg">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.excerpt}</p>

              <div className="mt-4 flex justify-between text-sm">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600"
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

      {blogs.length === 0 && (
        <p className="text-gray-500 mt-10">No blogs published yet.</p>
      )}
    </div>
  );
}
