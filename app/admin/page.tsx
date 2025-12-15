"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Contact = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // ✅ Dashboard stats
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    today: 0,
  });

  /* ============================
     AUTH CHECK
  ============================ */
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setCheckingAuth(false);
    fetchContacts();
    fetchStats();
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
     FETCH STATS
  ============================ */
  async function fetchStats() {
    const { data } = await supabase
      .from("contact_inquiries")
      .select("id, is_read, created_at");

    if (!data) return;

    const today = new Date().toISOString().split("T")[0];

    setStats({
      total: data.length,
      unread: data.filter((d) => !d.is_read).length,
      today: data.filter((d) =>
        d.created_at?.startsWith(today)
      ).length,
    });
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

    fetchStats();
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
    fetchStats();
  }

  /* ============================
     LOGOUT
  ============================ */
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  /* ============================
     LOADING STATES
  ============================ */
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication…
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Total Inquiries</p>
          <h3 className="text-2xl font-bold">{stats.total}</h3>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Unread</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {stats.unread}
          </h3>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-500">Today</p>
          <h3 className="text-2xl font-bold text-green-600">
            {stats.today}
          </h3>
        </div>
      </div>

      {/* TABLE */}
      {loading && <p>Loading inquiries...</p>}

      {!loading && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  className={`border-t ${
                    !c.is_read ? "bg-blue-50" : ""
                  }`}
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
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>

                    <button
                      onClick={() => deleteInquiry(c.id)}
                      className="text-red-600 hover:underline"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3 right-3 text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Inquiry Details
            </h2>

            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Service:</strong> {selectedContact.service}</p>

            <p className="mt-4 whitespace-pre-wrap text-gray-700">
              {selectedContact.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
