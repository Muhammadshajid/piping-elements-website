import Link from "next/link";

const blogs = [
  {
    slug: "supply-chain-risk",
    title: "Managing Supply Chain Risk in EPC Projects",
    excerpt: "Key strategies to reduce delays and cost overruns...",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="py-24 bg-[var(--dark-blue)] text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold">Insights & Knowledge</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <div key={b.slug} className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg">{b.title}</h3>
              <p className="text-gray-600 mt-2">{b.excerpt}</p>
              <Link href={`/blog/${b.slug}`} className="text-blue-600 mt-4 inline-block">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
