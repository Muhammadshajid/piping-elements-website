'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function login(e){
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message)
    router.push('/admin/dashboard')
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={login} className="space-y-3">
        <input className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
        <input className="w-full p-2 border rounded" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
