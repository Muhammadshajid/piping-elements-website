export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="py-24 bg-[var(--dark-blue)] text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold">
            Engineering Expertise Meets Global Supply Chain Intelligence
          </h1>
          <p className="mt-4 max-w-3xl">
            Knowledge, experience, and innovative solutions for energy and
            fabrication sectors.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold">Who We Are</h2>
            <p className="mt-4 text-gray-600">
              Piping Elements is a trusted partner for EPC, oil & gas, and
              fabrication companies across the GCC. We specialize in supply
              chain solutions, engineering consultancy, senior-level expert
              advisory, and GCC-authorized software solutions.
            </p>
          </div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg">Our Mission</h3>
            <p className="text-gray-600 mt-2">
              To deliver practical, expert-led solutions that enhance project
              efficiency and knowledge transfer across the industry.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg">Our Vision</h3>
            <p className="text-gray-600 mt-2">
              To be the go-to platform for EPC professionals seeking senior
              guidance, supply chain excellence, and digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--primary-blue)] text-white text-center">
        <h2 className="text-2xl font-bold">
          Want to work with senior EPC experts?
        </h2>
        <button className="btn-outline mt-6">Talk to an Expert</button>
      </section>
    </>
  );
}
