import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <section className="grid grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl font-bold">Engineering Intelligence | Supply Chain Expertise | Digital Innovation</h1>
          <p className="mt-4">Supporting EPC, oil & gas, and fabrication companies with senior-level consulting, end-to-end supply chain solutions, and GCC-authorized software for piping fabrication.</p>
          <div className="mt-6">
            <Link href="/services" className="btn-primary mr-3">Explore Services</Link>
            <Link href="/contact" className="btn-primary" style={{background:'#f59e0b'}}>Talk to an Expert</Link>
          </div>
        </div>
        <div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Our Core Verticals</h3>
            <ul className="mt-4 space-y-2">
              <li><strong>Supply Chain & Procurement:</strong> Efficient material sourcing, vendor management, and project support.</li>
              <li><strong>Engineering Consultancy:</strong> Multi-discipline engineering guidance.</li>
              <li><strong>Senior Expert Advisory:</strong> Retired EPC managers and PhDs.</li>
              <li><strong>Software Solutions:</strong> Pipesurf, SpoolCAD, PipeCloud.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Why Piping Elements?</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="card">Senior Expertise</div>
          <div className="card">End-to-End Solutions</div>
          <div className="card">Trusted by Contractors</div>
          <div className="card">Authorized Software Partner</div>
        </div>
      </section>
    </div>
  );
}
