import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const revalidate = 0; // disable cache while fixing

// SERVER-ONLY SUPABASE CLIENT
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Props = {
  params: { slug: string };
};

export default async function BlogDetail({ params }: Props) {
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (error || !blog) {
    console.error(error);
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        {blog.title}
      </h1>

      {/* DATE */}
      <p className="text-sm text-gray-500 mb-6">
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

      {/* CONTENT — FIXED HTML RENDER */}
      <article
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
          className="text-blue-600 font-medium hover:underline"
        >
          Share this blog →
        </button>
      </div>
    </div>
  );
}
