"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Facebook, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { trackPageView } from "@/lib/analytics";

type Blog = {
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pathname = usePathname();
  const pageUrl = `https://piping-elements-websites-halsaetie-muhammad-shajids-projects.vercel.app${pathname}`;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    trackPageView(`/blog/${params.slug}`);
  }, [params.slug]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blogs")
        .select("title, content, image_url, created_at")
        .eq("slug", params.slug)
        .single();

      if (data) setBlog(data as Blog);
    })();
  }, [params.slug]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!blog) {
    return (
      <div className="py-32 text-center text-gray-600">
        Loading blog...
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-500 mb-8">
        {new Date(blog.created_at).toDateString()}
      </p>

      {/* Image */}
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full rounded-lg mb-10"
        />
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>

      {/* Share Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>

        <div className="flex items-center gap-4">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600"
            title="Share on WhatsApp"
          >
            <svg
              viewBox="0 0 32 32"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M19.11 17.5c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.35-.79-.71-1.33-1.59-1.49-1.86-.16-.27-.02-.42.12-.56.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.11 2.82.14.18 1.93 2.95 4.68 4.13.66.28 1.17.45 1.57.57.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
              <path d="M16 3C9.38 3 4 8.38 4 15c0 2.66.87 5.12 2.34 7.1L4 29l7.1-2.34C12.88 27.13 14.34 28 16 28c6.62 0 12-5.38 12-12S22.62 3 16 3z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 text-blue-700" />
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 text-blue-600" />
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-6 h-6 text-sky-500" />
          </a>

          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="flex items-center gap-1 text-gray-700"
          >
            <LinkIcon className="w-5 h-5" />
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </article>
  );
}
