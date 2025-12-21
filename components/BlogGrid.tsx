"use client";

import Link from "next/link";

export default function BlogGrid({ blogs }: { blogs: any[] }) {
  if (blogs.length === 0) {
    return <p className="text-gray-500">No blogs published yet.</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white shadow rounded-xl overflow-hidden"
        >
          {/* IMAGE */}
          {blog.cover_image && (
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-6">
            <h2 className="text-xl font-semibold">{blog.title}</h2>

            <p className="text-gray-600 mt-2">{blog.excerpt}</p>

            <div className="flex justify-between items-center mt-4">
              <Link
                href={`/blog/${blog.slug}`}
                className="text-blue-600"
              >
                Read More →
              </Link>

              {/* SHARE */}
              <button
                onClick={() =>
                  navigator.share?.({
                    title: blog.title,
                    url: `${window.location.origin}/blog/${blog.slug}`,
                  })
                }
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
