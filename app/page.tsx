import ExpertsCarousel from "@/components/ExpertsCarousel";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="py-28"
        style={{
          background:
            "linear-gradient(rgba(15,42,86,0.85), rgba(15,42,86,0.85)), url('/hero.jpg') center/cover",
        }}
      >
        <div className="container mx-auto px-6 text-white">
          <p className="text-sm uppercase tracking-wide mb-4">
            Engineering Intelligence | Supply Chain Expertise | Digital Innovation
          </p>

          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">
            Supporting EPC, oil & gas, and fabrication companies with senior-level
            consulting and GCC-authorized software
          </h1>

          <div className="mt-8 flex gap-4">
            <Link href="/services" className="btn-primary">
              Explore Services
            </Link>
            <Link href="/contact" className="btn bg-white text-dark border-dark">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VERTICALS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-sm uppercase text-gray-500">
            Our Core Verticals
          </h2>
          <p className="text-center text-2xl font-bold mt-2">
            Comprehensive solutions for the energy and EPC sector
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              [
                "Supply Chain & Procurement",
                "Efficient material sourcing, vendor management, and project support.",
              ],
              [
                "Engineering Consultancy",
                "Multi-discipline engineering guidance for planning, fabrication, and execution.",
              ],
              [
                "Senior Expert Advisory",
                "Access retired EPC managers, PhDs, and industry specialists.",
              ],
              [
                "Software Solutions",
                "GCC-authorized software: Pipesurf and SpoolCAD.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-600 mt-2">{desc}</p>
                <Link href="#" className="text-blue-600 mt-4 inline-block">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PIPING ELEMENTS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-2xl font-bold mb-12">
            Why Piping Elements?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              [
                "Senior Expertise",
                "Access to retired EPC leaders and industry PhDs with decades of experience.",
              ],
              [
                "End-to-End Solutions",
                "From procurement to engineering to digital tools—complete project support.",
              ],
              [
                "Trusted by Contractors",
                "Proven track record with Tier-1, 2, and 3 contractors across GCC.",
              ],
              [
                "Authorized Software Partner",
                "GCC-authorized distributor for leading piping fabrication software.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-gray-600 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EXPERTS — NOW USING COMPONENT */}
      <ExpertsCarousel />

      {/* SOFTWARE SECTION */}
      <section className="py-24 text-white" style={{ background: "#1e4fd8" }}>
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold">
            GCC-Authorized Software Solutions
          </h2>
          <p className="mt-4 max-w-2xl">
            Streamline your piping fabrication process from drawing to dispatch
            with our GCC-authorized software solutions.
          </p>

          <ul className="mt-6 space-y-2">
            <li>✔ PipeCloud – Cloud-based project management</li>
            <li>✔ Pipesurf – Complete fabrication management</li>
            <li>✔ SpoolCAD – 3D modeling, BOM & ERP integration</li>
          </ul>

          <button className="btn-outline mt-8">View All Software</button>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-2xl font-bold">
            Latest Insights & Blog
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Expert knowledge and industry updates
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {["Supply Chain", "Digital Transformation", "Advisory"].map(
              (cat) => (
                <div key={cat} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="h-40 bg-gray-200 rounded-md mb-4"></div>
                  <p className="text-blue-600 text-sm">{cat}</p>
                  <h3 className="font-semibold mt-2">
                    Sample blog title goes here
                  </h3>
                  <Link href="#" className="text-blue-600 mt-3 inline-block">
                    Read More →
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-20 text-center text-white"
        style={{ background: "#1e4fd8" }}
      >
        <h2 className="text-2xl font-bold">
          Need guidance from senior EPC professionals?
        </h2>
        <p className="mt-2">
          Connect with our expert advisory panel for personalized support.
        </p>
        <button className="btn-outline mt-6">Talk to an Expert</button>
      </section>
    </>
  );
}


