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
      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-sm text-gray-500 mb-8">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      <article className="prose max-w-none">
        {blog.content}
      </article>
    </div>
  );
}
