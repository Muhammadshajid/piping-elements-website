"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Linkedin,
  Twitter,
  Share2,
  MessageCircle,
} from "lucide-react";
import { trackPageView } from "@/lib/analytics";

export default function BlogDetailPage() {
  const pathname = usePathname();
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}`
      : "";

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <article className="bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            How EPC Companies Can Reduce Project Risk
          </h1>
          <p className="text-gray-300">
            By Piping Elements · March 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Engineering, Procurement, and Construction projects carry
              significant technical and commercial risk. Senior-level advisory
              and structured supply chain strategies play a critical role in
              mitigating these risks.
            </p>

            <h2>Why Risk Management Matters</h2>
            <p>
              EPC projects often suffer from schedule overruns, cost escalation,
              and coordination challenges. Early-stage engineering clarity and
              procurement discipline are essential.
            </p>

            <h2>The Role of Senior Expertise</h2>
            <p>
              Organizations that leverage retired EPC leaders and domain experts
              benefit from real-world decision-making, not theoretical models.
            </p>

            <p>
              At Piping Elements, we support contractors with expert advisory,
              supply chain optimization, and execution intelligence.
            </p>
          </div>

          {/* Share */}
          <div className="mt-12 border-t pt-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium flex items-center gap-2">
                <Share2 className="h-5 w-5" /> Share
              </span>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href={`https://wa.me/?text=${url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
