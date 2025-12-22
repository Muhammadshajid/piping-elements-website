"use client";

import {
  FaWhatsapp,
  FaLinkedin,
  FaFacebook,
  FaLink,
} from "react-icons/fa";

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex gap-4 mt-6">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className="text-2xl text-green-500 hover:scale-110 transition" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="text-2xl text-blue-700 hover:scale-110 transition" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="text-2xl text-blue-600 hover:scale-110 transition" />
      </a>

      {/* Copy Link */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert("Link copied!");
        }}
        aria-label="Copy link"
      >
        <FaLink className="text-2xl text-gray-600 hover:scale-110 transition" />
      </button>
    </div>
  );
}
