import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (error || !blog) {
    return (
      <div className="p-10 text-center text-gray-500">
        Blog not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        {blog.title}
      </h1>

      <p className="text-gray-400 mb-6">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      {/* IMAGE */}
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full rounded-xl mb-8"
        />
      )}

      {/* CONTENT (HTML FIX) */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* SHARE */}
      <div className="mt-10">
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Blog link copied!");
          }}
          className="text-blue-600 font-medium"
        >
          Share this blog →
        </button>
      </div>
    </div>
  );
}
