import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type AuthPayload = {
  userId: string;
  email: string;
};

export function verifyAuth(req: NextRequest): AuthPayload {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    return decoded;
  } catch (err) {
    console.error("Token verification failed", err);
    throw new Error("Unauthorized: Invalid token");
  }
}
