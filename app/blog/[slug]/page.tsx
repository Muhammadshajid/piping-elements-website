import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = params;

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!blog) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      {/* DATE */}
      <p className="text-sm text-gray-500 mb-8">
        Published on{" "}
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      {/* COVER IMAGE (optional) */}
      {blog.cover_image && (
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="rounded-xl mb-10"
        />
      )}

      {/* CONTENT */}
      <div className="prose prose-lg max-w-none">
        {blog.content}
      </div>
    </article>
  );
}
