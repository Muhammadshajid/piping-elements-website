"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header className="bg-gradient-to-r from-[#0b3c78] to-[#082f5c] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 font-bold text-lg">
          <span className="border-l-4 border-blue-400 pl-3">
            PIPING ELEMENTS
          </span>
          <span className="text-sm font-normal opacity-80">
            Admin
          </span>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex gap-4">
          <Link href="/" className="opacity-80 hover:opacity-100">
            View Site
          </Link>

          <button
            onClick={logout}
            className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#082f5c] transition"
          >
            Logout
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#082f5c] border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)}>
              View Site
            </Link>

            <button
              onClick={logout}
              className="text-left text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
