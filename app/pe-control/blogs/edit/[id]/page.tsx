"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  content: string | null;
  image_url: string | null;
  published: boolean;
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params?.id || "");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Supply Chain");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        setError(error?.message || "Blog not found");
      } else {
        const b = data as Blog;
        setTitle(b.title || "");
        setSlug(b.slug || "");
        setExcerpt(b.excerpt || "");
        setCategory(b.category || "Supply Chain");
        setContent(b.content || "");
        setPublished(!!b.published);
        setImageUrl(b.image_url || null);
      }
      setLoading(false);
    })();
  }, [id, router]);

  async function uploadImageIfNeeded(): Promise<string | null> {
    if (!file) return imageUrl;
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `blog_${id}_${Date.now()}.${ext}`;
    const path = `blogs/${filename}`;

    const { error: upErr } = await supabase.storage
      .from("media")
      .upload(path, file, { upsert: true });

    if (upErr) throw upErr;

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  }

  async function save() {
    setError(null);
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const finalSlug = slug || slugify(title);
      const finalImage = await uploadImageIfNeeded();
      const { error: updateErr } = await supabase
        .from("blogs")
        .update({
          title,
          slug: finalSlug,
          excerpt,
          category,
          content,
          image_url: finalImage,
          published,
        })
        .eq("id", id);

      if (updateErr) throw updateErr;
      router.push("/pe-control/blogs");
    } catch (e: any) {
      setError(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this blog post?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    router.push("/pe-control/blogs");
  }

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Edit Blog</h1>
        <div className="flex gap-2">
          <button onClick={remove} className="btn-outline">Delete</button>
          <button onClick={save} className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </div>
      </div>

      <div className="grid gap-4 mt-6">
        <div>
          <label className="label">Title</label>
          <input className="input" value={title} onChange={(e) => { setTitle(e.target.value); setSlug(slugify(e.target.value)); }} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Slug</label>
            <input className="input" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Supply Chain</option>
              <option>Engineering</option>
              <option>Expert Advisory</option>
              <option>Digital Transformation</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Excerpt</label>
          <textarea className="input" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div>
          <label className="label">Cover Image</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          {imageUrl && <p className="text-sm text-gray-500 mt-2">Current: {imageUrl}</p>}
        </div>
        <div>
          <label className="label">Content</label>
          <div className="bg-white">
            <ReactQuill value={content} onChange={setContent} />
          </div>
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          Published
        </label>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
