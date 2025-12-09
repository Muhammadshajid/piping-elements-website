import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  Mail,
  Users,
  BarChart3,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  Shield,
} from 'lucide-react';
import {
  adminLogin,
  adminLogout,
  isAdminLoggedIn,
  verifyAdminSession,
  getAllContactSubmissions,
  getAllNewsletterSubscriptions,
  getPageAnalytics,
} from '../utils/api';
import type { ContactSubmission, NewsletterSubscription } from '../utils/supabase/client';

interface AnalyticsData {
  totalViews: number;
  pageStats: { [key: string]: number };
  recentViews: any[];
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data state
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterSubscription[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletter' | 'analytics'>('contacts');

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAdminLoggedIn()) {
      const result = await verifyAdminSession();
      if (result.success && result.data?.valid) {
        setIsLoggedIn(true);
        loadDashboardData();
      } else {
        await adminLogout();
        setIsLoggedIn(false);
      }
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    const result = await adminLogin(password);

    if (result.success) {
      setIsLoggedIn(true);
      setPassword('');
      loadDashboardData();
    } else {
      setLoginError(result.error || 'Invalid password');
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsLoggedIn(false);
    navigate('/');
  };

  const loadDashboardData = async () => {
    setLoading(true);

    // Load all data in parallel
    const [contactsResult, newslettersResult, analyticsResult] = await Promise.all([
      getAllContactSubmissions(),
      getAllNewsletterSubscriptions(),
      getPageAnalytics(),
    ]);

    if (contactsResult.success) {
      setContacts(contactsResult.data || []);
    }

    if (newslettersResult.success) {
      setNewsletters(newslettersResult.data || []);
    }

    if (analyticsResult.success) {
      setAnalytics(analyticsResult.data || null);
    }

    setLoading(false);
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
            </div>

            <h1 className="text-center text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-center text-gray-600 mb-8">Piping Elements - Secure Access</p>

            {loginError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? 'Logging in...' : 'Login to Dashboard'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                🔒 Protected by secure authentication
                <br />
                Default password: <code className="bg-gray-100 px-2 py-1 rounded">PipingElements2024!</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Piping Elements Management Portal</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Contact Submissions</p>
                <p className="text-gray-900">{contacts.length}</p>
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
                <p className="text-gray-900">{newsletters.length}</p>
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
                <p className="text-gray-900">{analytics?.totalViews || 0}</p>
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
            <div className="flex">
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 ${
                  activeTab === 'contacts'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contact Submissions ({contacts.length})
              </button>
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`px-6 py-4 ${
                  activeTab === 'newsletter'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Newsletter ({newsletters.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 ${
                  activeTab === 'analytics'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading data...</p>
              </div>
            ) : (
              <>
                {/* Contacts Tab */}
                {activeTab === 'contacts' && (
                  <div className="space-y-4">
                    {contacts.length === 0 ? (
                      <p className="text-gray-600 text-center py-8">No contact submissions yet.</p>
                    ) : (
                      contacts.map((contact) => (
                        <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-gray-900">{contact.name}</h3>
                              <p className="text-gray-600">{contact.email}</p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {contact.service}
                            </span>
                          </div>
                          {contact.company && (
                            <p className="text-gray-600 mb-2">
                              <strong>Company:</strong> {contact.company}
                            </p>
                          )}
                          {contact.phone && (
                            <p className="text-gray-600 mb-2">
                              <strong>Phone:</strong> {contact.phone}
                            </p>
                          )}
                          <p className="text-gray-700 mb-3">
                            <strong>Message:</strong> {contact.message}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Submitted: {new Date(contact.created_at || '').toLocaleString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Newsletter Tab */}
                {activeTab === 'newsletter' && (
                  <div className="space-y-4">
                    {newsletters.length === 0 ? (
                      <p className="text-gray-600 text-center py-8">No newsletter subscribers yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
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
                                  {new Date(sub.created_at || '').toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-gray-900 mb-4">Page Views by Page</h3>
                      <div className="space-y-3">
                        {analytics && Object.entries(analytics.pageStats).map(([page, count]) => (
                          <div key={page} className="flex items-center">
                            <div className="w-32 text-gray-700">{page}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                              <div
                                className="bg-blue-600 h-full flex items-center px-3 text-white text-sm"
                                style={{
                                  width: `${(count / analytics.totalViews) * 100}%`,
                                  minWidth: '60px',
                                }}
                              >
                                {count} views
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
