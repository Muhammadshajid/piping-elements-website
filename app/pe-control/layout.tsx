"use client";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0b3c78] text-white hidden md:flex flex-col">
        <div className="px-6 py-5 text-lg font-bold border-b border-white/20">
          Piping Elements
          <p className="text-sm font-normal text-white/70">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            href="/pe-control"
            className="block px-4 py-2 rounded hover:bg-white/10"
          >
            Dashboard
          </Link>

          <Link
            href="/pe-control/blogs"
            className="block px-4 py-2 rounded hover:bg-white/10"
          >
            Blogs
          </Link>

          <Link
            href="/pe-control/software"
            className="block px-4 py-2 rounded hover:bg-white/10"
          >
            Software

          <Link
            href="/pe-control/chats"
            className="block px-4 py-2 rounded hover:bg-white/10"
          >
            Chat Inbox
          </Link>
          </Link>

          <Link
            href="/pe-control/experts"
            className="block px-4 py-2 rounded hover:bg-white/10"
          >
            Admin Users
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
