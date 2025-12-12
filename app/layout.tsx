import "./globals.css";
import Link from "next/link";
import ChatBox from "@/components/ChatBox";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {/* HEADER */}
        <header className="bg-gradient-to-r from-[#0b3c78] to-[#082f5c] text-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="font-bold text-lg">PIPING ELEMENTS</div>

            <nav className="hidden md:flex gap-6">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/software">Software</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </nav>

            <div className="flex gap-3">
              <button className="btn-outline">Request Consultation</button>
              <button className="btn-primary">Request Software Demo</button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* CHATBOX — ADDED HERE */}
        <ChatBox />

        {/* FOOTER */}
        <footer className="bg-[#020617] text-gray-300 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold">Piping Elements</h4>
              <p className="text-sm mt-2">
                Engineering Intelligence & Supply Chain Expertise
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/software">Software</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Contact</h4>
              <p>info@pipingelements.com</p>
              <p>+971 50 123 4567</p>
              <p>Dubai, UAE</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}



