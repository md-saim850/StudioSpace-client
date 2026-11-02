'use client'
import { toast } from "sonner";

export default function DeleteBtn({id}:{id:string}) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-booking/${id}`, {
        method: "DELETE",
        // headers: {
        //   "Authorization": `Bearer ${data.token}`
        // }
      });

      if (!res.ok) {
        toast.error("Failed to delete booking.");
        return;
      }

      toast.success("Booking deleted successfully."); 

    } catch (error) {
      console.error("Delete booking error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <button
      onClick={handleDelete}
      type="button"
      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors shrink-0 cursor-pointer"
    >
      Cancel Booking
    </button>
  )
}
