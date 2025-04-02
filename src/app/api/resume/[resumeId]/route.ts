// src/app/api/resume/[resumeId]/route.ts

import { db } from "@/db";
import { resumes } from "@/db/schema/resumes";
import { verifyToken } from "@/lib/verifyToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
// ✔️ new helper to verify token from headers

export async function GET(
  req: NextRequest,
  context: { params: { resumeId: string } }
) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Missing token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token); // You need to create this function using jwt.verify()

    const resumeId = context.params.resumeId;

    // const resume = await db.query.resumes.findFirst({
    //   where: eq(resumes.id, resumeId),
    // });

    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.id, resumeId),
      with: {
        projects: {
          with: {
            descriptions: true,
          },
        },
        experiences: {
          with: {
            descriptions: true,
          },
        },
      },
    });

    if (!resume || resume.userId !== user.userId) {
      return NextResponse.json(
        { success: false, error: "Resume not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, resume });
  } catch (err) {
    console.error("Resume fetch error:", err);
    return NextResponse.json(
      { success: false, error: "Unauthorized or invalid request" },
      { status: 401 }
    );
  }
}
