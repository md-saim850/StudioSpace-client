
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  const isLoggedIn = !!session?.user;

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/dashboard/:path",
  ],
};
