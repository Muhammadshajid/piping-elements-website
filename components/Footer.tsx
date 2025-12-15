import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#020617] text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="text-white font-semibold text-lg">Piping Elements</div>
          <p className="text-sm mt-2">
            Engineering Intelligence &amp; Supply Chain Expertise
          </p>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/software">Software Solutions</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Contact</div>
          <div className="text-sm space-y-2">
            <div>Email: info@pipingelements.com</div>
            <div>WhatsApp: +971-XXX-XXXXXX</div>
            <div>Dubai, UAE</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-gray-400 flex flex-col gap-2 md:flex-row md:justify-between">
          <div>© {new Date().getFullYear()} Piping Elements. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
