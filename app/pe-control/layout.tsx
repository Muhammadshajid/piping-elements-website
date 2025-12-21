"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  LayoutDashboard,
  FileText,
  Package,
  MessageSquare,
  Shield,
  Mail,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function NavItem({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
      }`}
    >
      <span className="text-gray-500">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const links = useMemo(
    () => [
      { href: "/pe-control", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
      { href: "/pe-control/blogs", label: "Blogs", icon: <FileText className="h-4 w-4" /> },
      { href: "/pe-control/chats", label: "Chat Inbox", icon: <MessageSquare className="h-4 w-4" /> },
      { href: "/pe-control/experts", label: "Admin Users", icon: <Shield className="h-4 w-4" /> },
      { href: "/pe-control/newsletter", label: "Newsletter", icon: <Mail className="h-4 w-4" /> },
      { href: "/pe-control/analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
    ],
    []
  );

  useEffect(() => {
    // Soft guard: if user isn't logged in, redirect.
    // Individual pages still perform stronger checks (admin_users).
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) router.push("/login");
      setChecked(true);
    })();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Checking authentication…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar (matches Figma style) */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-blue-600">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden>
                  <rect x="4" y="8" width="4" height="24" fill="currentColor" />
                  <rect x="12" y="4" width="4" height="32" fill="currentColor" />
                  <rect x="20" y="12" width="4" height="16" fill="currentColor" />
                  <rect x="28" y="6" width="4" height="28" fill="currentColor" />
                </svg>
              </div>
              <div>
                <div className="text-gray-900 font-semibold">Admin Dashboard</div>
                <div className="text-gray-600 text-sm">Piping Elements Management Portal</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <button
                onClick={logout}
                className="hidden md:flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-wrap gap-2 mt-4">
            {links.map((l) => (
              <NavItem
                key={l.href}
                href={l.href}
                label={l.label}
                icon={l.icon}
                active={pathname === l.href}
              />
            ))}
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden mt-4 grid grid-cols-1 gap-2">
              {links.map((l) => (
                <NavItem
                  key={l.href}
                  href={l.href}
                  label={l.label}
                  icon={l.icon}
                  active={pathname === l.href}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <button
                onClick={logout}
                className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  );
}