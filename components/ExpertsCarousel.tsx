const experts = [
  { name: "Senior EPC Advisor", role: "Piping & Fabrication" },
  { name: "Welding Specialist", role: "QA/QC & NDT" },
  { name: "Procurement Lead", role: "Supply Chain" },
  { name: "Project Controls Expert", role: "Planning & Cost" },
];

export default function ExpertsCarousel() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Featured Experts</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {experts.map((e) => (
            <div key={e.name} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-semibold">{e.name}</h3>
              <p className="text-sm text-gray-600">{e.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
