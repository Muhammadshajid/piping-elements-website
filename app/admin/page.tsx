"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  /* ============================
     AUTH CHECK
  ============================ */
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setCheckingAuth(false);
    fetchContacts();
  }

  /* ============================
     FETCH CONTACTS
  ============================ */
  async function fetchContacts() {
    const { data } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setContacts(data);
    setLoading(false);
  }

  /* ============================
     MARK AS READ
  ============================ */
  async function markAsRead(id: string) {
    await supabase
      .from("contact_inquiries")
      .update({ is_read: true })
      .eq("id", id);

    setContacts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, is_read: true } : c
      )
    );
  }

  /* ============================
     DELETE
  ============================ */
  async function deleteInquiry(id: string) {
    if (!confirm("Delete this inquiry?")) return;

    await supabase
      .from("contact_inquiries")
      .delete()
      .eq("id", id);

    setContacts((prev) => prev.filter((c) => c.id !== id));
    setSelectedContact(null);
  }

  /* ============================
     LOGOUT
  ============================ */
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center">Checking authentication…</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </div>

      {!loading && (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Service</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className={`border-t ${!c.is_read ? "bg-blue-50" : ""}`}
                >
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.service}</td>
                  <td className="p-3">
                    {c.is_read ? "Read" : "Unread"}
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedContact(c);
                        if (!c.is_read) markAsRead(c.id);
                      }}
                      className="text-blue-600"
                    >
                      View
                    </button>

                    <button
                      onClick={() => deleteInquiry(c.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {contacts.length === 0 && (
            <p className="p-6 text-gray-500">No inquiries yet.</p>
          )}
        </div>
      )}

      {/* MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Inquiry Details</h2>

            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Service:</strong> {selectedContact.service}</p>

            <p className="mt-4 whitespace-pre-wrap">
              {selectedContact.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
