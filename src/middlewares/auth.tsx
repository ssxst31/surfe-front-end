import { NextRequest, NextResponse } from "next/server";

export async function withoutAuth(req: NextRequest) {
  const isMe = req.cookies.get("token");

  if (isMe) {
    return NextResponse.redirect(new URL("/userList", req.url));
  } else {
    return NextResponse.next();
  }
}

export async function withAuth(req: NextRequest) {
  const isMe = req.cookies.get("token");

  if (!isMe) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
}
