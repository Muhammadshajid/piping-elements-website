"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Expert = {
  id: string;
  name: string;
  discipline: string | null;
  title: string | null;
  bio: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
};

export default function ExpertsAdminPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Expert[]>([]);
  const [editing, setEditing] = useState<Expert | null>(null);
  const [form, setForm] = useState({
    name: "",
    discipline: "",
    title: "",
    bio: "",
    published: true,
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // admin check
      const { data: admin } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle();
      if (!admin) {
        await supabase.auth.signOut();
        router.push("/login");
        return;
      }
      setCheckingAuth(false);
      await load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("experts")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as Expert[]) || []);
    setLoading(false);
  }

  function resetForm() {
    setEditing(null);
    setForm({ name: "", discipline: "", title: "", bio: "", published: true });
    setFile(null);
  }

  async function uploadImage(f: File) {
    const ext = f.name.split(".").pop();
    const path = `experts/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("public-assets").upload(path, f, {
      upsert: true,
      contentType: f.type,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
    return data.publicUrl;
  }

  async function save() {
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    let image_url = editing?.image_url ?? null;
    try {
      if (file) image_url = await uploadImage(file);
    } catch (e: any) {
      alert(e?.message || "Image upload failed");
      return;
    }

    if (editing) {
      const { error } = await supabase
        .from("experts")
        .update({
          name: form.name,
          discipline: form.discipline || null,
          title: form.title || null,
          bio: form.bio || null,
          published: form.published,
          image_url,
        })
        .eq("id", editing.id);
      if (error) return alert(error.message);
    } else {
      const { error } = await supabase
        .from("experts")
        .insert({
          name: form.name,
          discipline: form.discipline || null,
          title: form.title || null,
          bio: form.bio || null,
          published: form.published,
          image_url,
        });
      if (error) return alert(error.message);
    }

    await load();
    resetForm();
  }

  async function remove(id: string) {
    if (!confirm("Delete this expert?")) return;
    const { error } = await supabase.from("experts").delete().eq("id", id);
    if (error) return alert(error.message);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const title = useMemo(() => (editing ? "Edit Expert" : "Add Expert"), [editing]);

  if (checkingAuth) {
    return <div className="min-h-[60vh] flex items-center justify-center">Checking authentication...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Experts</h1>
          <p className="text-sm text-slate-500 mt-1">Add, edit, publish, or remove experts shown on the website.</p>
        </div>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold">Experts List</h2>
              <button onClick={() => { resetForm(); }} className="text-sm text-slate-600 hover:text-slate-900">New</button>
            </div>

            {loading ? (
              <div className="p-6 text-slate-500">Loading...</div>
            ) : items.length === 0 ? (
              <div className="p-6 text-slate-500">No experts yet.</div>
            ) : (
              <div className="divide-y">
                {items.map((e) => (
                  <div key={e.id} className="p-4 flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                      {e.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={e.image_url} alt={e.name} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{e.name}</p>
                        {!e.published && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Draft</span>}
                      </div>
                      <p className="text-sm text-slate-600 truncate">{e.discipline || e.title || "-"}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="text-blue-700 hover:underline"
                        onClick={() => {
                          setEditing(e);
                          setForm({
                            name: e.name || "",
                            discipline: e.discipline || "",
                            title: e.title || "",
                            bio: e.bio || "",
                            published: !!e.published,
                          });
                          setFile(null);
                        }}
                      >
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline" onClick={() => remove(e.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="font-semibold">{title}</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-sm text-slate-600">Name</label>
                <input className="input mt-1" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Discipline</label>
                <input className="input mt-1" value={form.discipline} onChange={(e) => setForm((p) => ({ ...p, discipline: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Title</label>
                <input className="input mt-1" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Bio</label>
                <textarea className="input mt-1 min-h-[110px]" value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm text-slate-600">Photo</label>
                <input className="input mt-1" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <p className="text-xs text-slate-500 mt-1">Uploads to Supabase Storage bucket: <strong>public-assets</strong></p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))} />
                Published
              </label>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="btn-primary">Save</button>
                <button onClick={resetForm} className="btn-outline">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
