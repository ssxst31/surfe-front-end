import { NextRequest } from "next/server";

import { withAuth, withoutAuth } from "middlewares/auth";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/every-chat") ||
    request.nextUrl.pathname.startsWith("/setting") ||
    request.nextUrl.pathname.startsWith("/private-chat") ||
    request.nextUrl.pathname.startsWith("/my") ||
    request.nextUrl.pathname.startsWith("/explore")
  ) {
    return await withAuth(request);
  }

  if (request.nextUrl.pathname.startsWith("/signup") || request.nextUrl.pathname === "/") {
    return await withoutAuth(request);
  }
}
