import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function routeHandler(req) {
  const token = req.cookies.get("admin_token")?.value;

  const url = req.nextUrl.clone();

  // protect admin routes
  if (url.pathname.startsWith("/admin/dashboard")) {
    if (!token) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}