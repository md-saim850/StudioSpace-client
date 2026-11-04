'use client'
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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

      const res = await fetch(`${process.env.API_URL}/delete-booking/${id}`,{
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to delete from my booking.");
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
      onClick={handleDelete}
      type="button"
      disabled={deleting}
      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800 dark:hover:bg-rose-600 dark:hover:text-white"
    >
      {deleting ? (
        <span className="inline-flex items-center gap-1.5">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Cancelling...
        </span>
      ) : (
        "Cancel Booking"
      )}
    </button>
  )
}
