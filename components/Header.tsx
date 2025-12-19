"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white md:bg-gradient-to-r md:from-[#0b3c78] md:to-[#082f5c]">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-blue-600"></div>
          <span className="font-bold tracking-wide text-[#0b3c78] md:text-white">
            PIPING ELEMENTS
          </span>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-6 text-white">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/software">Software</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>

           <div className="flex gap-4">
            <Link href="/contact" className="ml-4 px-4 py-2 rounded-lg border border-white">
             Request Consultation
            </Link>
            <Link href="/software" className="px-4 py-2 rounded-lg bg-blue-500">
            Request Software Demo
            </Link>
          </div>
         
        </nav>

        {/* MOBILE MENU ICON */}
        <button
          className="md:hidden text-2xl text-[#0b3c78]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-6 py-4 space-y-4 text-[#0b3c78]">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/software" onClick={() => setOpen(false)}>Software</Link>
            <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
