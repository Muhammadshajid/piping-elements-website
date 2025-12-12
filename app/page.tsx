import Link from "next/link"

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#0b3c78] to-[#082f5c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <p className="uppercase text-sm mb-3">
            Engineering Intelligence | Supply Chain Expertise | Digital Innovation
          </p>

          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
            Supporting EPC, oil & gas, and fabrication companies
          </h1>

          <p className="mt-6 max-w-2xl">
            Senior-level consulting, end-to-end supply chain solutions, and
            GCC-authorized software for piping fabrication.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/services" className="btn-primary">
              Explore Services
            </Link>
            <Link href="/contact" className="btn-outline">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VERTICALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-2xl font-semibold">Our Core Verticals</h2>
        <p className="text-center text-gray-500 mt-2">
          Comprehensive solutions for the energy and EPC sector
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="card">
            <h3 className="font-semibold">Supply Chain & Procurement</h3>
            <p className="mt-2 text-sm">
              Efficient material sourcing, vendor management, and project support.
            </p>
            <span className="text-blue-600 mt-3 inline-block">Learn More →</span>
          </div>

          <div className="card">
            <h3 className="font-semibold">Engineering Consultancy</h3>
            <p className="mt-2 text-sm">
              Multi-discipline engineering guidance.
            </p>
            <span className="text-blue-600 mt-3 inline-block">Learn More →</span>
          </div>

          <div className="card">
            <h3 className="font-semibold">Senior Expert Advisory</h3>
            <p className="mt-2 text-sm">
              Retired EPC managers and PhDs.
            </p>
            <span className="text-blue-600 mt-3 inline-block">Learn More →</span>
          </div>

          <div className="card">
            <h3 className="font-semibold">Software Solutions</h3>
            <p className="mt-2 text-sm">
              Pipesurf, SpoolCAD, PipeCloud.
            </p>
            <span className="text-blue-600 mt-3 inline-block">Learn More →</span>
          </div>
        </div>
      </section>

    </main>
  )
}

