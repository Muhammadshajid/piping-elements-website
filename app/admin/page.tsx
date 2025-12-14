"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  /* ============================
     AUTH CHECK (STEP 13.3)
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
  }

  /* ============================
     FETCH CONTACT DATA
  ============================ */
  async function fetchContacts() {
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setContacts(data);
    }

    setLoading(false);
  }

  /* ============================
     LOGOUT (STEP 13.4)
  ============================ */
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  /* ============================
     UI STATES
  ============================ */
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-outline">
          Logout
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Company</th>
                <th className="p-3">Email</th>
                <th className="p-3">Service</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.company}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.service}</td>
                  <td className="p-3">
                    {new Date(c.created_at).toLocaleDateString()}
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
    </div>
  );
}
