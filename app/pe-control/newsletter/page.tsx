"use client";

// Same dashboard UI as /pe-control, opened directly on the Newsletter tab.

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

export default function AdminNewsletterPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"contacts" | "newsletter" | "analytics">("newsletter");

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

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
    setAnalytics({ totalViews: views.length, pageStats, recentViews: views.slice(0, 25) });

    setLoading(false);
  }

  if (checkingAuth) {
    return <div className="min-h-[60vh] flex items-center justify-center">Checking authentication…</div>;
  }

  return (
    <div>
      {/* Stats */}
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
              {activeTab === "contacts" && (
                <p className="text-gray-600">Open Dashboard tab “Contact Submissions” for full details.</p>
              )}

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

              {activeTab === "analytics" && (
                <p className="text-gray-600">Open Analytics page for full report.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
