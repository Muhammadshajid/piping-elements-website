import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Engineering Intelligence <br />
            Supply Chain Expertise <br />
            Digital Innovation
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Supporting EPC, oil & gas, and fabrication companies with senior-level
            consulting, end-to-end supply chain solutions, and GCC-authorized
            software for piping fabrication.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/services" className="btn-primary">
              Explore Services
            </Link>
            <Link href="/contact" className="btn-accent">
              Talk to an Expert
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-2xl font-semibold mb-4">
            Our Core Verticals
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li><strong>Supply Chain & Procurement:</strong> Efficient material sourcing and vendor management.</li>
            <li><strong>Engineering Consultancy:</strong> Multi-discipline engineering guidance.</li>
            <li><strong>Senior Expert Advisory:</strong> Retired EPC managers and PhDs.</li>
            <li><strong>Software Solutions:</strong> Pipesurf, SpoolCAD, PipeCloud.</li>
          </ul>
        </div>
      </section>

      {/* WHY US */}
      <section className="section bg-white rounded-t-3xl">
        <h2 className="section-title">Why Piping Elements?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="card">Senior Expertise</div>
          <div className="card">End-to-End Solutions</div>
          <div className="card">Trusted by Contractors</div>
          <div className="card">Authorized Software Partner</div>
        </div>
      </section>
    </>
  );
}
