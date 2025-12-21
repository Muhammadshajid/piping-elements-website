"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinkBase =
  "text-sm font-medium transition-colors";
const activeCls = "text-blue-600";
const inactiveCls = "text-gray-700 hover:text-blue-600";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  const isServices = pathname?.startsWith("/services");

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <img
              src="/logo.png"
              alt="Piping Elements"
              className="h-10 w-auto"
            />
            <span className="hidden sm:inline text-gray-900 font-semibold tracking-wide">
              PIPING ELEMENTS
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`${navLinkBase} ${isActive("/") ? activeCls : inactiveCls}`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`${navLinkBase} ${isActive("/about") ? activeCls : inactiveCls}`}
            >
              About
            </Link>

            {/* Services dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                className={`${navLinkBase} ${isServices ? activeCls : inactiveCls} flex items-center gap-2`}
                aria-expanded={servicesOpen}
              >
                Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
                  <Link
                    href="/services/supply-chain"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setServicesOpen(false)}
                  >
                    Supply Chain
                  </Link>
                  <Link
                    href="/services/engineering-consultancy"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setServicesOpen(false)}
                  >
                    Engineering Consultancy
                  </Link>
                  <Link
                    href="/services/senior-expert-advisory"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setServicesOpen(false)}
                  >
                    Senior Expert Advisory
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/student-mentoring"
              className={`${navLinkBase} ${isActive("/student-mentoring") ? activeCls : inactiveCls}`}
            >
              Student Mentoring
            </Link>

            <Link
              href="/blog"
              className={`${navLinkBase} ${isActive("/blog") ? activeCls : inactiveCls}`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`${navLinkBase} ${isActive("/contact") ? activeCls : inactiveCls}`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile button */}
          <button
            className="lg:hidden text-gray-800 p-2"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-6">
            <div className="pt-4 space-y-2">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-lg ${isActive("/") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-lg ${isActive("/about") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {/* Services */}
              <button
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg ${isServices ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setServicesOpen((v) => !v)}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="ml-3 border-l border-gray-100 pl-3 space-y-1">
                  <Link
                    href="/services/supply-chain"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => { setIsOpen(false); setServicesOpen(false); }}
                  >
                    Supply Chain
                  </Link>
                  <Link
                    href="/services/engineering-consultancy"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => { setIsOpen(false); setServicesOpen(false); }}
                  >
                    Engineering Consultancy
                  </Link>
                  <Link
                    href="/services/senior-expert-advisory"
                    className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => { setIsOpen(false); setServicesOpen(false); }}
                  >
                    Senior Expert Advisory
                  </Link>
                </div>
              )}

              <Link
                href="/student-mentoring"
                className={`block px-3 py-2 rounded-lg ${isActive("/student-mentoring") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setIsOpen(false)}
              >
                Student Mentoring
              </Link>

              <Link
                href="/blog"
                className={`block px-3 py-2 rounded-lg ${isActive("/blog") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-lg ${isActive("/contact") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
