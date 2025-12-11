'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function NewBlog(){
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const router = useRouter()

  async function uploadFile(file){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/get-signed-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: file.name, folder: 'blog-images', bucket: 'website-assets' })
    });
    const json = await res.json();
    if (json.error) throw new Error(json.error);
    await fetch(json.uploadUrl, { method: 'PUT', body: file });
    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/website-assets/${json.path}`;
    return publicUrl;
  }

  async function handleCreate(e){
    e.preventDefault();
    let cover = '';
    if (file) cover = await uploadFile(file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug: title.toLowerCase().replace(/\s+/g,'-'), excerpt, content, cover_image: cover, is_published: true })
    });
    const json = await res.json();
    if (json.error) return alert(json.error);
    router.push('/admin/blogs');
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-xl mb-4">New Blog</h2>
      <form onSubmit={handleCreate} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="w-full p-2 border" placeholder="Excerpt" value={excerpt} onChange={e=>setExcerpt(e.target.value)} />
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </form>
    </div>
  )
}
