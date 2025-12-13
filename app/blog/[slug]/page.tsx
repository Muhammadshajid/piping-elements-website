import { supabase } from "@/lib/supabaseClient";

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!blog) return <p>Blog not found</p>;

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-500 mt-2">{blog.category}</p>

        <article className="mt-8 prose max-w-none">
          {blog.content}
        </article>
      </div>
    </section>
  );
}
