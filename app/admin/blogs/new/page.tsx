"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";

// Rich editor
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    let imageUrl = null;

    // 1️⃣ Upload image
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, image);

      if (error) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    // 2️⃣ Insert blog
    await supabase.from("blogs").insert({
      title,
      excerpt,
      content,
      image_url: imageUrl,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      published,
      published_at: published ? new Date() : null,
    });

    setLoading(false);
    router.push("/admin/blogs");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">New Blog</h1>

      <div className="space-y-6">
        <input
          className="w-full border rounded-lg p-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Short Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <ReactQuill value={content} onChange={setContent} />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish immediately
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </div>
  );
}
