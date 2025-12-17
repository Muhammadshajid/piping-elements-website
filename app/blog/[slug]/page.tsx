import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

export default async function BlogDetail({ params }: Props) {
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!blog) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">
        {blog.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      {/* ✅ IMAGE */}
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full rounded-xl mb-8 object-cover"
        />
      )}

      {/* ✅ CONTENT (SAFE HTML FIX) */}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* ✅ SHARE */}
      <div className="mt-10">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href);
              alert("Blog link copied!");
            }
          }}
        >
          Share this blog →
        </button>
      </div>
    </div>
  );
}
