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

  /* ================= AUTH ================= */
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: admin } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!admin) {
        await supabase.auth.signOut();
        router.push("/login");
        return;
      }

      setCheckingAuth(false);
      await load();
    })();
  }, [router]);

  /* ================= LOAD ================= */
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

  /* ================= IMAGE UPLOAD (FIXED) ================= */
  async function uploadImage(f: File) {
    const ext = f.name.split(".").pop() || "jpg";
    const path = `experts/${Date.now()}-${Math.random()
      .toString(16)
      .slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("media")
      .upload(path, f, {
        upsert: false,
        cacheControl: "3600",
        contentType: f.type,
      });

    if (error) throw error;

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  }

  /* ================= SAVE ================= */
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
      const { error } = await supabase.from("experts").insert({
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

  const title = useMemo(
    () => (editing ? "Edit Expert" : "Add Expert"),
    [editing]
  );

  if (checkingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Experts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Add, edit, publish, or remove experts shown on the website.
          </p>
        </div>
        <button onClick={handleLogout} className="btn-outline">
          Logout
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LIST */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow border">
          {loading ? (
            <p className="p-6 text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="p-6 text-slate-500">No experts yet.</p>
          ) : (
            <div className="divide-y">
              {items.map((e) => (
                <div key={e.id} className="p-4 flex gap-4 items-center">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden">
                    {e.image_url && (
                      <img
                        src={e.image_url}
                        alt={e.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{e.name}</p>
                    <p className="text-sm text-slate-500">
                      {e.discipline || e.title || "-"}
                    </p>
                  </div>
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      setEditing(e);
                      setForm({
                        name: e.name,
                        discipline: e.discipline || "",
                        title: e.title || "",
                        bio: e.bio || "",
                        published: e.published,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => remove(e.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow border p-5">
          <h2 className="font-semibold mb-4">{title}</h2>

          <input
            className="input mb-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm((p) => ({ ...p, name: e.target.value }))
            }
          />

          <input
            className="input mb-2"
            placeholder="Discipline"
            value={form.discipline}
            onChange={(e) =>
              setForm((p) => ({ ...p, discipline: e.target.value }))
            }
          />

          <input
            className="input mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm((p) => ({ ...p, title: e.target.value }))
            }
          />

          <textarea
            className="input mb-2"
            placeholder="Bio"
            value={form.bio}
            onChange={(e) =>
              setForm((p) => ({ ...p, bio: e.target.value }))
            }
          />

          <input
            type="file"
            accept="image/*"
            className="input mb-2"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <p className="text-xs text-slate-500 mb-2">
            Uploads to Supabase Storage bucket:{" "}
            <strong>media / experts</strong>
          </p>

          <button onClick={save} className="btn-primary w-full">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
