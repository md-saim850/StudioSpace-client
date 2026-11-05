'use client'
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export default function DeleteBtn({id}:{id:string}) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;

    setDeleting(true);

    try {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Authentication failed!");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-listings/${id}`,{
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to delete listing.");
        return;
      }

      toast.success("Studio deleted successfully.");

    } catch (error) {
      console.error("Delete studio error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800 dark:hover:bg-rose-600 dark:hover:text-white"
    >
      {deleting ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </>
      )}
    </button>
  )
}
