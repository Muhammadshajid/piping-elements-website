export default function ServicesPage() {
  return (
    <>
      <section className="py-24 bg-[var(--dark-blue)] text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold">Our Services</h1>
          <p className="mt-4 max-w-2xl">
            Comprehensive consulting and supply chain solutions for EPC projects.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
          {[
            ["Supply Chain & Procurement", "Vendor sourcing, expediting, and project material control."],
            ["Engineering Consultancy", "Planning, fabrication, and execution support."],
            ["Senior Expert Advisory", "Retired EPC managers and PhD-level experts."],
            ["Project Controls", "Scheduling, cost control, and risk management."],
          ].map(([title, desc]) => (
            <div key={title} className="bg-white shadow-sm rounded-xl p-6">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
