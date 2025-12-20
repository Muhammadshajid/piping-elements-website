"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { BarChart3, Mail, Users } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type NewsletterSubscription = {
  id: string;
  email: string;
  created_at: string;
};

type PageViewRow = {
  id: string;
  page: string;
  user_agent: string | null;
  created_at: string;
};

type AnalyticsData = {
  totalViews: number;
  pageStats: Record<string, number>;
  recentViews: PageViewRow[];
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"contacts" | "newsletter" | "analytics">("contacts");

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const stats = useMemo(() => {
    return {
      contacts: contacts.length,
      newsletters: newsletters.length,
      totalViews: analytics?.totalViews || 0,
    };
  }, [contacts.length, newsletters.length, analytics?.totalViews]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

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
      await loadAll();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadAll() {
    setLoading(true);

    const [contactsRes, newslettersRes, viewsRes] = await Promise.all([
      supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter_subscriptions").select("*").order("created_at", { ascending: false }),
      supabase.from("page_views").select("*").order("created_at", { ascending: false }).limit(2000),
    ]);

    setContacts(((contactsRes.data as any) || []) as Contact[]);
    setNewsletters(((newslettersRes.data as any) || []) as NewsletterSubscription[]);

    const views = (((viewsRes.data as any) || []) as PageViewRow[]).filter((v) => !!v.page);
    const pageStats: Record<string, number> = {};
    for (const v of views) pageStats[v.page] = (pageStats[v.page] || 0) + 1;
    setAnalytics({
      totalViews: views.length,
      pageStats,
      recentViews: views.slice(0, 25),
    });

    setLoading(false);
  }

  async function markAsRead(id: string) {
    await supabase.from("contact_inquiries").update({ is_read: true }).eq("id", id);
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, is_read: true } : c)));
  }

  async function deleteInquiry(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await supabase.from("contact_inquiries").delete().eq("id", id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setSelectedContact(null);
  }

  if (checkingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Checking authentication…
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards (Figma style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Contact Submissions</p>
              <p className="text-gray-900 text-3xl font-semibold">{stats.contacts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Newsletter Subscribers</p>
              <p className="text-gray-900 text-3xl font-semibold">{stats.newsletters}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Page Views</p>
              <p className="text-gray-900 text-3xl font-semibold">{stats.totalViews}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "contacts"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact Submissions ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab("newsletter")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "newsletter"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Newsletter ({newsletters.length})
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === "analytics"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics
            </button>

            <div className="ml-auto px-4 py-3">
              <button
                onClick={loadAll}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
              <p className="text-gray-600 mt-4">Loading data...</p>
            </div>
          ) : (
            <>
              {/* Contacts */}
              {activeTab === "contacts" && (
                <div className="space-y-4">
                  {contacts.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No contact submissions yet.</p>
                  ) : (
                    contacts.map((c) => (
                      <div key={c.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div>
                            <h3 className="text-gray-900 font-semibold">{c.name}</h3>
                            <p className="text-gray-600">{c.email}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {c.service}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                c.is_read ? "bg-gray-100 text-gray-700" : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {c.is_read ? "Read" : "Unread"}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-700 whitespace-pre-wrap">
                          <strong>Message:</strong> {c.message}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-gray-500 text-sm">
                            Submitted: {new Date(c.created_at || "").toLocaleString()}
                          </p>
                          <div className="flex gap-4">
                            <button
                              onClick={() => {
                                setSelectedContact(c);
                                if (!c.is_read) markAsRead(c.id);
                              }}
                              className="text-blue-700 hover:underline"
                            >
                              View
                            </button>
                            <button onClick={() => deleteInquiry(c.id)} className="text-red-700 hover:underline">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Newsletter */}
              {activeTab === "newsletter" && (
                <div className="space-y-4">
                  {newsletters.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No newsletter subscribers yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-gray-700">Email</th>
                            <th className="px-6 py-3 text-left text-gray-700">Subscribed</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {newsletters.map((sub) => (
                            <tr key={sub.id}>
                              <td className="px-6 py-4 text-gray-900">{sub.email}</td>
                              <td className="px-6 py-4 text-gray-600">
                                {new Date(sub.created_at || "").toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Analytics */}
              {activeTab === "analytics" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Page Views by Page</h3>
                    {!analytics || Object.keys(analytics.pageStats).length === 0 ? (
                      <p className="text-gray-600">No analytics data yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(analytics.pageStats)
                          .sort((a, b) => b[1] - a[1])
                          .map(([page, count]) => (
                            <div key={page} className="flex items-center gap-3">
                              <div className="w-40 text-gray-700 truncate">{page}</div>
                              <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                                <div
                                  className="bg-blue-600 h-full flex items-center px-3 text-white text-sm"
                                  style={{
                                    width: `${Math.max(8, (count / (analytics.totalViews || 1)) * 100)}%`,
                                  }}
                                >
                                  {count} views
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Recent Views</h3>
                    {!analytics || analytics.recentViews.length === 0 ? (
                      <p className="text-gray-600">No recent views.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-gray-700">Page</th>
                              <th className="px-6 py-3 text-left text-gray-700">Time</th>
                              <th className="px-6 py-3 text-left text-gray-700">User Agent</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {analytics.recentViews.map((v) => (
                              <tr key={v.id}>
                                <td className="px-6 py-4 text-gray-900">{v.page}</td>
                                <td className="px-6 py-4 text-gray-600">
                                  {new Date(v.created_at || "").toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-gray-600 max-w-[420px] truncate">
                                  {v.user_agent || "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal (Contact Details) */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3 right-3 text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Inquiry Details</h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {selectedContact.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p>
                <strong>Service:</strong> {selectedContact.service}
              </p>
              <p className="text-gray-500 text-sm">
                Submitted: {new Date(selectedContact.created_at || "").toLocaleString()}
              </p>
            </div>

            <div className="mt-4">
              <strong className="text-gray-900">Message:</strong>
              <p className="mt-2 whitespace-pre-wrap text-gray-700">{selectedContact.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
