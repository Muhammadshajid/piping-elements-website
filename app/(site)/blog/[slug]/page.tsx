"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { trackPageView } from "@/lib/analytics";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const pathname = usePathname();
  const url = `https://yourdomain.com${pathname}`;

  useEffect(() => {
    trackPageView(`/blog/${params.slug}`);
  }, [params.slug]);

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">
        Blog Title Goes Here
      </h1>

      <p className="text-gray-500 mb-8">
        Published on Sep 10, 2025
      </p>

      <div className="prose prose-lg max-w-none mb-12">
        <p>
          This is the detailed blog content. Replace this with your actual blog
          body coming from database or CMS.
        </p>
      </div>

      {/* Share */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-6 w-6 text-blue-600" />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-6 w-6 text-blue-700" />
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-6 w-6 text-sky-500" />
          </a>
        </div>
      </div>
    </article>
  );
}
