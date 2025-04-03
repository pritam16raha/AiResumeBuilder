// src/app/api/cover-letter/[resumeId]/route.ts

import { db } from "@/db";
import { verifyToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    const resumeId = params.resumeId;
    console.log(user);

    const coverLetter = await db.query.coverLetters.findFirst({
      where: (cl, { eq }) => eq(cl.resumeId, resumeId),
    });

    if (!coverLetter) {
      return NextResponse.json(
        { success: false, error: "Cover letter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      coverLetter: coverLetter.content,
    });
  } catch (err) {
    console.error("❌ Error fetching cover letter:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
