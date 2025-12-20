"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type SoftwareItem = {
  id: string;
  name: string;
  slug: string;
  short_desc: string | null;
  description: string | null;
  logo_url: string | null;
  published: boolean;
  created_at: string;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminSoftwarePage() {
  const router = useRouter();
  const [items, setItems] = useState<SoftwareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SoftwareItem | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    short_desc: "",
    description: "",
    published: true,
  });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/login");
      const { data: admin } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle();
      if (!admin) {
        await supabase.auth.signOut();
        return router.push("/login");
      }
      await load();
    })();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("software_items").select("*").order("created_at", { ascending: false });
    setItems((data as any) || []);
    setLoading(false);
  }

  function reset() {
    setSelected(null);
    setFile(null);
    setForm({ name: "", slug: "", short_desc: "", description: "", published: true });
  }

  async function uploadLogoIfNeeded(): Promise<string | null> {
    if (!file) return selected?.logo_url || null;
    const ext = file.name.split(".").pop() || "png";
    const path = `software/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("public-assets").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
    return data.publicUrl;
  }

  async function save() {
    if (!form.name.trim()) return alert("Name is required");
    const slug = (form.slug || slugify(form.name)).trim();
    try {
      const logo_url = await uploadLogoIfNeeded();
      const payload = {
        name: form.name.trim(),
        slug,
        short_desc: form.short_desc.trim() || null,
        description: form.description.trim() || null,
        logo_url,
        published: !!form.published,
      };
      if (selected) {
        const { error } = await supabase.from("software_items").update(payload).eq("id", selected.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("software_items").insert(payload);
        if (error) throw error;
      }
      reset();
      await load();
    } catch (e: any) {
      alert(e?.message || "Save failed");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("software_items").delete().eq("id", id);
    if (error) return alert(error.message);
    await load();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Software Manager</h1>
          <p className="text-slate-600 mt-1">Add / edit / delete software solutions (logos, detail pages).</p>
        </div>
        <button onClick={logout} className="btn-outline">Logout</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Items</h2>
            <button onClick={load} className="text-sm text-blue-700 hover:underline">Refresh</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <p className="p-6">Loading...</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Slug</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-t">
                      <td className="p-3 font-medium">{it.name}</td>
                      <td className="p-3 text-slate-600">{it.slug}</td>
                      <td className="p-3">{it.published ? "Published" : "Draft"}</td>
                      <td className="p-3 text-right space-x-3">
                        <button
                          onClick={() => {
                            setSelected(it);
                            setForm({
                              name: it.name,
                              slug: it.slug,
                              short_desc: it.short_desc || "",
                              description: it.description || "",
                              published: it.published,
                            });
                            setFile(null);
                          }}
                          className="text-blue-700 hover:underline"
                        >
                          Edit
                        </button>
                        <button onClick={() => remove(it.id)} className="text-red-700 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td className="p-6 text-slate-500" colSpan={4}>No software items yet.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">{selected ? "Edit" : "New"} item</h2>
            {selected && (
              <button onClick={reset} className="text-sm text-slate-600 hover:underline">Clear</button>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid gap-4">
              <div>
                <label className="text-sm text-slate-600">Name</label>
                <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: p.slug || slugify(e.target.value) }))} className="input mt-1" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Slug</label>
                <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} className="input mt-1" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Short description</label>
                <textarea value={form.short_desc} onChange={(e) => setForm((p) => ({ ...p, short_desc: e.target.value }))} className="input mt-1 min-h-[90px]" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Full description</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className="input mt-1 min-h-[140px]" />
              </div>
              <div>
                <label className="text-sm text-slate-600">Logo</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="input mt-1" />
                <p className="text-xs text-slate-500 mt-1">Uploads to Supabase Storage bucket: <strong>public-assets</strong></p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))} />
                Published
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="btn-primary">Save</button>
                <button onClick={reset} className="btn-outline">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
