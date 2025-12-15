"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#0b3c78] to-[#082f5c] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Piping Elements" width={140} height={28} priority />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:opacity-90">Home</Link>
          <Link href="/about" className="hover:opacity-90">About</Link>
          <Link href="/services" className="hover:opacity-90">Services</Link>
          <Link href="/software" className="hover:opacity-90">Software</Link>
          <Link href="/blog" className="hover:opacity-90">Blog</Link>
          <Link href="/contact" className="hover:opacity-90">Contact</Link>
        </nav>

        {/* CTA BUTTONS */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-outline">Request Consultation</Link>
          <Link href="/contact" className="btn-primary">Request Software Demo</Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/15"
          aria-label="Toggle menu"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 text-sm">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/software" onClick={() => setOpen(false)}>Software</Link>
            <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

            <div className="pt-2 flex gap-3">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-outline flex-1 text-center">
                Request Consultation
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
