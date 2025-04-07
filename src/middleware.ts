// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Set CORS headers globally
  res.headers.set("Access-Control-Allow-Origin", "*"); // or your domain
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return res;
  return req;
}

// ✅ Apply middleware to only /api routes (optional)
export const config = {
  matcher: ["/api/:path*"],
};
