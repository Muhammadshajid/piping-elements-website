"use client";

import {
  FaWhatsapp,
  FaFacebook,
  FaLinkedin,
  FaLink,
} from "react-icons/fa";

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  function copyLink() {
    navigator.clipboard.writeText(url);
    alert("Link copied");
  }

  return (
    <div className="flex gap-3 text-xl text-gray-500">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
      >
        <FaWhatsapp />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
      >
        <FaFacebook />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
      >
        <FaLinkedin />
      </a>

      <button onClick={copyLink}>
        <FaLink />
      </button>
    </div>
  );
}
