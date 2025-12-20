"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function uploadImage(file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `blogs/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, {
    upsert: false,
    cacheControl: "3600",
  });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export default function NewBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Supply Chain");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) router.push("/login");
    })();
  }, [router]);

  useEffect(() => {
    if (!slug && title) setSlug(slugify(title));
  }, [title, slug]);

  async function handleSave() {
    setError(null);
    if (!title.trim()) return setError("Title is required");
    setSaving(true);

    try {
      let image_url: string | null = null;
      if (imageFile) image_url = await uploadImage(imageFile);

      const { error: insertError } = await supabase.from("blogs").insert({
        title,
        slug: slug || slugify(title),
        excerpt,
        category,
        content,
        image_url,
        published,
      });

      if (insertError) throw insertError;
      router.push("/pe-control/blogs");
    } catch (e: any) {
      setError(e?.message || "Failed to save blog");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">New Blog</h1>
        <button onClick={() => router.back()} className="btn-outline">Back</button>
      </div>

      {error && <div className="mb-4 p-3 rounded bg-red-50 text-red-700">{error}</div>}

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Slug (URL)</label>
            <input className="input mt-1" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <select className="input mt-1" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Supply Chain</option>
              <option>Engineering</option>
              <option>Expert Advisory</option>
              <option>Digital Transformation</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Excerpt</label>
          <textarea className="input mt-1" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            className="mt-2"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <p className="text-xs text-gray-500 mt-1">Uploads to Supabase Storage bucket: <b>media</b></p>
        </div>

        <div>
          <label className="text-sm font-medium">Content</label>
          <div className="mt-2">
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          <span className="text-sm">Publish now</span>
        </label>

        <div className="flex gap-3">
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={() => router.push("/pe-control/blogs")} className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  );
}
