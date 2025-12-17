import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";

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

  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blog.slug}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

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

      {/* CONTENT */}
      <article className="prose max-w-none">
        {blog.content}
      </article>

      {/* SHARE */}
      <ShareButtons url={blogUrl} title={blog.title} />
    </div>
  );
}
