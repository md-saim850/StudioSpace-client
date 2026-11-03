import { FolderOpen } from "lucide-react";

export default function Empty() {
  return (
    <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center dark:border-white/10 dark:bg-[#111111]">
      
      {/* Icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-300">
        <FolderOpen size={30} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Nothing here yet
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
        There is no data to display right now. Get started by adding something new.
      </p>
    </div>
  );
}