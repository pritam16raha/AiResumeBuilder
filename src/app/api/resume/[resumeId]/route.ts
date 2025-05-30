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
    const user = verifyToken(token);

    const resumeId = context.params.resumeId;

    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.id, resumeId),
      with: {
        projects: true, // Adjusted to simply fetch projects without descriptions
        experiences: true, // Adjusted to simply fetch experiences without descriptions
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

export async function DELETE(
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
    const user = verifyToken(token);

    const resumeId = context.params.resumeId;

    // ✅ Check resume ownership before deletion
    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.id, resumeId),
    });

    if (!resume || resume.userId !== user.userId) {
      return NextResponse.json(
        { success: false, error: "Resume not found or unauthorized" },
        { status: 404 }
      );
    }

    // ✅ Delete resume (cascade deletes handle related data)
    await db.delete(resumes).where(eq(resumes.id, resumeId));

    return NextResponse.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (err) {
    console.error("❌ Resume DELETE error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong while deleting resume" },
      { status: 500 }
    );
  }
}

