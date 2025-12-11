import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || '';
  const r = await fetch(`${apiBase}/blog-list`);
  const data = await r.json();
  res.status(200).json(data);
}
