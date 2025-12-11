export default async function BlogPost({ params }: { params: { slug: string }}){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog-get?slug=${params.slug}`);
  const json = await res.json();
  const blog = json.blog || { title: 'Not found', content: '' };
  return (<div className="container mx-auto p-8"><h1>{blog.title}</h1><div dangerouslySetInnerHTML={{ __html: blog.content || '' }} /></div>);
}
