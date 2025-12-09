import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-blue-600">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="8" width="4" height="24" fill="currentColor" />
                <rect x="12" y="4" width="4" height="32" fill="currentColor" />
                <rect x="20" y="12" width="4" height="16" fill="currentColor" />
                <rect x="28" y="6" width="4" height="28" fill="currentColor" />
              </svg>
            </div>
            <span className="ml-3 text-gray-900">PIPING ELEMENTS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition-colors`}
            >
              About Us
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`${
                  location.pathname.startsWith('/services')
                    ? 'text-blue-600'
                    : 'text-gray-700'
                } hover:text-blue-600 transition-colors flex items-center`}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link
                    to="/services/supply-chain"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Supply Chain & Procurement
                  </Link>
                  <Link
                    to="/services/engineering-consultancy"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Engineering Consultancy
                  </Link>
                  <Link
                    to="/services/senior-expert-advisory"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Senior Expert Advisory
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/software"
              className={`${
                isActive('/software') ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition-colors`}
            >
              Software Solutions
            </Link>
            <Link
              to="/blog"
              className={`${
                isActive('/blog') ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition-colors`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-600 transition-colors`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/contact"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              Request Consultation
            </Link>
            <Link
              to="/software"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Request Software Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              
              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      servicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/services/supply-chain"
                      className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Supply Chain & Procurement
                    </Link>
                    <Link
                      to="/services/engineering-consultancy"
                      className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Engineering Consultancy
                    </Link>
                    <Link
                      to="/services/senior-expert-advisory"
                      className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Senior Expert Advisory
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/software"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Software Solutions
              </Link>
              <Link
                to="/blog"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2 border-t border-gray-200 mt-2">
                <Link
                  to="/contact"
                  className="block w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Request Consultation
                </Link>
                <Link
                  to="/software"
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
