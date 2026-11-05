import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | StudioSpace",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white px-6 py-20 dark:bg-gray-950">
      <div className="w-full max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400 dark:text-gray-500">
          Error Code: 404
        </p>

        <h1 className="mt-5 text-8xl font-extrabold tracking-tighter dark:text-white text-black sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-500 dark:text-gray-400">
          Oops! The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gray-900/20 transition-colors duration-300 hover:bg-gray-800 sm:w-auto dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-gray-200"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:bg-gray-50 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          >
            <Compass size={18} />
            Explore Studios
          </Link>
        </div>
      </div>
    </main>
  );
}
