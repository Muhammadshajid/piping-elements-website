import Link from 'next/link';
import { Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Logo + Tagline */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="Piping Elements" 
                className="h-16 w-auto brightness-150 saturate-150"
              />
              <span className="ml-3 text-white">PIPING ELEMENTS</span>
            </div>
            <p className="text-gray-400">
              Engineering Intelligence & Supply Chain Expertise
            </p>
          </div>

          {/* Middle: Navigation */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About Us
              </Link>
              <Link href="/services" className="hover:text-blue-400 transition-colors">
                Services
              </Link>
              <Link href="/student-mentoring" className="hover:text-blue-400 transition-colors">
                Student Mentoring
              </Link>
              <Link href="/blog" className="hover:text-blue-400 transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Right: Contact */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:info@pipingelements.com"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                info@pipingelements.com
              </a>
              <a
                href="tel:+971501234567"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                +971 50 123 4567
              </a>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-400 mb-1">UAE Office</p>
              <p className="text-gray-400 mb-3">Dubai, United Arab Emirates</p>
              <p className="text-gray-400 mb-1">India Office</p>
              <p className="text-gray-400">Mumbai, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Piping Elements. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}