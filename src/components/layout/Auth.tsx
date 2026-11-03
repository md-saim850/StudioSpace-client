
"use client";

import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Auth() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 md:gap-4">
      <ThemeToggle />

      {session?.user ? (
        <Link href="/dashboard/my-booking">
          <Avatar>
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name || "User"}
            />
            <AvatarFallback>
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/sign-in"
            className="px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-lg dark:border-gray-700"
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className="px-5 py-2.5 text-sm font-medium text-white bg-black rounded-lg dark:bg-white dark:text-black"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
