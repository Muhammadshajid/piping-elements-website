import Link from 'next/link';
export default async function BlogPage(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog-list`);
  const json = await res.json();
  const blogs = json.blogs || [];
  return (<div className="container mx-auto p-8"><h1 className="text-2xl">Blog</h1><ul>{blogs.map((b:any)=>(<li key={b.id}><Link href={`/blog/${b.slug}`}>{b.title}</Link></li>))}</ul></div>);
}
