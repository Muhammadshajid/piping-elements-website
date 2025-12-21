"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type ChatMsg = {
  id: string;
  name: string | null;
  email: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
};

export default function AdminChatsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ChatMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ChatMsg | null>(null);

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
    const { data } = await supabase.from("chat_messages").select("*").order("created_at", { ascending: false });
    setRows((data as any) || []);
    setLoading(false);
  }

  async function markRead(id: string) {
    await supabase.from("chat_messages").update({ is_read: true }).eq("id", id);
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, is_read: true } : r)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await supabase.from("chat_messages").delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
    setSelected(null);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Chat Inbox</h1>
          <p className="text-slate-600 mt-1">Messages submitted via the website chat widget.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={load} className="btn-outline">Refresh</button>
          <button onClick={logout} className="btn-outline">Logout</button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={`border-t ${!r.is_read ? "bg-blue-50" : ""}`}>
                  <td className="p-3 font-medium">{r.name || "Anonymous"}</td>
                  <td className="p-3">{r.email || "-"}</td>
                  <td className="p-3">{r.is_read ? "Read" : "Unread"}</td>
                  <td className="p-3">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="p-3 text-right space-x-3">
                    <button
                      className="text-blue-700 hover:underline"
                      onClick={() => {
                        setSelected(r);
                        if (!r.is_read) markRead(r.id);
                      }}
                    >
                      View
                    </button>
                    <button className="text-red-700 hover:underline" onClick={() => remove(r.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td className="p-6 text-slate-500" colSpan={5}>No messages yet.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3">X</button>
            <h2 className="text-xl font-bold mb-3">Chat Message</h2>
            <p><strong>Name:</strong> {selected.name || "Anonymous"}</p>
            <p><strong>Email:</strong> {selected.email || "-"}</p>
            <div className="mt-4">
              <strong>Message:</strong>
              <p className="mt-2 whitespace-pre-wrap text-slate-700">{selected.message}</p>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => remove(selected.id)} className="btn-outline">Delete</button>
              <button onClick={() => setSelected(null)} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
