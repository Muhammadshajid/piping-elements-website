import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-[520px] flex items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,42,74,0.85), rgba(11,42,74,0.85)), url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl text-white">
          <p className="text-sm tracking-wide mb-3">
            Engineering Intelligence | Supply Chain Expertise | Digital Innovation
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Supporting EPC, oil & gas, and fabrication companies
          </h1>

          <p className="mt-5 text-lg opacity-90">
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
      </div>
    </section>
  );
}
