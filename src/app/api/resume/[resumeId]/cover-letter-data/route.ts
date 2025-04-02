import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { resumes } from "@/db/schema/resumes";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/verifyToken";
import { validate as uuidValidate } from "uuid";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const parts = pathname.split("/"); // /api/resume/<id>/cover-letter-data
    const resumeId = parts[3];

    if (!uuidValidate(resumeId)) {
      return NextResponse.json(
        { success: false, error: "Invalid resume ID format" },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Missing token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const user = verifyToken(token); // Must return { userId }

    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.id, resumeId),
      with: {
        experiences: {
          with: { descriptions: true },
        },
        projects: {
          with: { descriptions: true },
        },
      },
    });

    if (!resume || resume.userId !== user.userId) {
      return NextResponse.json(
        { success: false, error: "Resume not found or access denied" },
        { status: 404 }
      );
    }

    const { fullName, role, education, experiences, projects } = resume;

    return NextResponse.json({
      success: true,
      data: {
        fullName,
        role,
        education,
        experience: experiences,
        projects,
      },
    });
  } catch (error) {
    console.error("Cover Letter Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error or invalid token" },
      { status: 500 }
    );
  }
}
