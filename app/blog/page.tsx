import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default async function BlogPage() {
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs?.map((b) => (
          <Link
            key={b.id}
            href={`/blog/${b.slug}`}
            className="bg-white shadow rounded-lg p-6"
          >
            <h2 className="font-bold text-lg">{b.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {b.excerpt || b.content}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
