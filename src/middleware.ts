import { NextRequest } from "next/server";
import { withAuth, withoutAuth } from "middlewares/auth";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const path = nextUrl.pathname;

  const authRequiredPaths = ["/every-chat", "/setting", "/private-chat", "/my", "/explore"];

  if (authRequiredPaths.some((requiredPath) => path.startsWith(requiredPath))) {
    return await withAuth(request);
  }

  const authNotRequiredPaths = ["/signup", "/"];

  if (authNotRequiredPaths.includes(path)) {
    return await withoutAuth(request);
  }

  return request;
}
