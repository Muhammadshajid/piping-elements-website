import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const revalidate = 0; // disable cache until stable

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

  if (error) {
    console.error(error);
    return <p className="p-10 text-red-600">Failed to load blogs</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Insights & Blogs</h1>
      <p className="text-gray-600 mb-10">
        Expert knowledge, industry updates, and insights
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {/* IMAGE */}
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
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-gray-600 text-sm mt-2">
                {blog.excerpt}
              </p>

              {/* FULL WIDTH READ MORE */}
              <Link
                href={`/blog/${blog.slug}`}
                className="mt-4 inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg"
              >
                Read More →
              </Link>

              <div className="mt-3 flex justify-between text-xs text-gray-400">
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`
                    );
                    alert("Blog link copied!");
                  }}
                >
                  Share
                </button>
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
