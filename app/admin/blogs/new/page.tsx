"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);

    let imageUrl = null;

    /* ---------- IMAGE UPLOAD ---------- */
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

    /* ---------- SAVE BLOG ---------- */
    await supabase.from("blogs").insert({
      title,
      content,
      image_url: imageUrl,
      published,
    });

    setLoading(false);
    router.push("/admin/blogs");
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">New Blog</h1>

      <input
        className="w-full border p-3 rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-3 rounded mb-4 h-40"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <label className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Publish
      </label>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {loading ? "Saving..." : "Save Blog"}
      </button>
    </div>
  );
}
