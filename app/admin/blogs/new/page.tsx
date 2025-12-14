"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    await supabase.from("blogs").insert({
      title,
      slug,
      content,
      published,
    });

    router.push("/admin/blogs");
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-3 rounded min-h-[200px]"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish
        </label>

        <button className="btn-primary">Save Blog</button>
      </form>
    </div>
  );
}
