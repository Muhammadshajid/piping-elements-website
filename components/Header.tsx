"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

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
         <Link href="/" className="flex items-center gap-3">
  <img
    src="/public/logo.png"
    alt="Piping Elements Logo"
    className="h-8 w-auto"
  />
  <span className="font-semibold text-lg">PIPING ELEMENTS</span>
</Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`${isActive("/") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`${isActive("/about") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 transition-colors`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className={`${isServices ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 transition-colors flex items-center`}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    href="/services/supply-chain"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Supply Chain & Procurement
                  </Link>
                  <Link
                    href="/services/engineering-consultancy"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Engineering Consultancy
                  </Link>
                  <Link
                    href="/services/senior-expert-advisory"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Senior Expert Advisory
                  </Link>
                </div>
              </div>
            </div>

            {/* <Link
              href="/"
              className={`${isActive("/") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 transition-colors`}
            >
              Software Solutions
            </Link> */}
            <Link
              href="/blog"
              className={`${isActive("/blog") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 transition-colors`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`${isActive("/contact") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 transition-colors`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Request Consultation
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Request Software Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {servicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/services/supply-chain"
                      className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Supply Chain & Procurement
                    </Link>
                    <Link
                      href="/services/engineering-consultancy"
                      className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Engineering Consultancy
                    </Link>
                    <Link
                      href="/services/senior-expert-advisory"
                      className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Senior Expert Advisory
                    </Link>
                  </div>
                )}
              </div>

              {/* <Link
                href="/"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Software Solutions
              </Link> */}
              <Link
                href="/blog"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2 border-t border-gray-200 mt-2">
                <Link
                  href="/contact"
                  className="block w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Request Consultation
                </Link>
                <Link
                  href="/"
                  className="block w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Request Software Demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
