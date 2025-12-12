import './globals.css'
import Link from 'next/link'

export const metadata = { title: 'Piping Elements' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <header className="header p-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-xl font-bold">Piping Elements</div>
            <nav className="space-x-4">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/software">Software</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <div>
              <button className="btn-primary">Request Consultation</button>
              <button className="ml-2 btn-primary" style={{background:'#f59e0b'}}>Request Software Demo</button>
            </div>
          </div>
        </header>
     <main className="min-h-screen">{children}</main>
        <footer className="p-6 text-sm bg-white mt-8">
          <div className="container mx-auto flex justify-between">
            <div>Piping Elements – Engineering Intelligence & Supply Chain Expertise</div>
            <div className="space-x-4">
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/software">Software</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <div>info@pipingelements.com</div>
              <div>WhatsApp: +971-XXX-XXXXXX</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
