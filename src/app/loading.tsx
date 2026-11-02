export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin dark:border-gray-700 dark:border-t-white" />

        <p className="text-gray-600 font-medium dark:text-gray-300">
          Loading your studios...
        </p>
      </div>
    </div>
  );
}