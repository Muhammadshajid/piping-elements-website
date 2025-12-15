"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  published: boolean;
  created_at: string;
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    fetchBlogs();
  }

  async function fetchBlogs() {
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBlogs(data);
    setLoading(false);
  }

  async function deleteBlog(id: string) {
    if (!confirm("Delete this blog?")) return;

    await supabase.from("blogs").delete().eq("id", id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <button
          onClick={() => router.push("/admin/blogs/new")}
          className="btn-primary"
        >
          + New Blog
        </button>
      </div>

      {loading && <p>Loading blogs...</p>}

      {!loading && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="p-3 font-medium">{b.title}</td>
                  <td className="p-3 text-center">
                    {b.published ? "Published" : "Draft"}
                  </td>
                  <td className="p-3 text-center">
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      onClick={() =>
                        router.push(`/admin/blogs/edit/${b.id}`)
                      }
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBlog(b.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {blogs.length === 0 && (
            <p className="p-6 text-gray-500">No blogs yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
