'use client'
import Link from 'next/link'
export default function Dashboard(){ return (<div className="p-8"><h2 className="text-2xl">Admin Dashboard</h2><div className="mt-4 space-x-3"><Link href='/admin/blogs'>Blogs</Link> <Link href='/admin/software'>Software</Link> <Link href='/admin/experts'>Experts</Link></div></div>)}