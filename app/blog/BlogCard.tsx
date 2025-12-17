"use client";

import Link from "next/link";
import ShareButtons from "./ShareButtons";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image_url: string | null;
  created_at: string;
};

export default function BlogCard({ blog }: { blog: Blog }) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${blog.slug}`
      : "";

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition">
      <Link href={`/blog/${blog.slug}`} className="block">
        {blog.image_url ? (
          <img
            src={blog.image_url}
            className="w-full h-48 object-cover"
            alt={blog.title}
          />
        ) : (
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="p-6">
          <h2 className="font-semibold text-lg">{blog.title}</h2>
          <p className="text-gray-600 mt-2">{blog.excerpt}</p>
        </div>
      </Link>

      <div className="px-6 pb-4 flex justify-between items-center text-sm">
        <span className="text-gray-400">
          {new Date(blog.created_at).toLocaleDateString()}
        </span>

        <ShareButtons url={url} title={blog.title} />
      </div>
    </div>
  );
}
