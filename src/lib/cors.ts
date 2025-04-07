// src/lib/cors.ts
import { NextRequest, NextResponse } from "next/server";

export function withCors(req: NextRequest, res: NextResponse) {
  const allowedOrigins = [
    "https://ai-resume-builder-eight-blond.vercel.app/", // your frontend URL
    "http://localhost:3000", // for local development
  ];

  const origin = req.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  return res;
}
