"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header className="bg-gradient-to-r from-[#0b3c78] to-[#082f5c] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-blue-400"></div>
          <span className="font-bold text-lg tracking-wide">
            PIPING ELEMENTS
          </span>
          <span className="hidden sm:inline text-sm text-blue-200">
            Admin
          </span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/admin" className="hover:text-blue-300">
            Dashboard
          </Link>
          <Link href="/" className="hover:text-blue-300">
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="border border-blue-300 px-4 py-1.5 rounded-md hover:bg-blue-300 hover:text-black transition"
          >
            Logout
          </button>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#082f5c] px-4 pb-4 space-y-3 text-sm">
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="block"
          >
            Dashboard
          </Link>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block"
          >
            View Site
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full text-left border border-blue-300 px-3 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
