// src/app/api/cover-letter/save/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { coverLetters } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { verifyToken } from "@/lib/verifyToken";

// ✅ Request body validation schema
const saveSchema = z.object({
  resumeId: z.string().uuid(),
  content: z.string().min(10, "Cover letter content is too short"),
});

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized - Missing token" },
        { status: 401 }
      );
    }

    const user = verifyToken(token); // must return { userId }
    const body = await req.json();
    const parsed = saveSchema.parse(body);

    const { resumeId, content } = parsed;

    // Optional: Check if resume belongs to this user (secure approach)
    const resume = await db.query.resumes.findFirst({
      where: (res, { eq }) => eq(res.id, resumeId),
    });

    if (!resume || resume.userId !== user.userId) {
      return NextResponse.json(
        { success: false, error: "Resume not found or access denied" },
        { status: 403 }
      );
    }

    await db.insert(coverLetters).values({
      id: uuidv4(),
      resumeId,
      content,
    });

    return NextResponse.json({ success: true, message: "Cover letter saved" });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("❌ Save cover letter error:", error);

    return NextResponse.json(
      { success: false, error: error.message || "Failed to save cover letter" },
      { status: 500 }
    );
  }
}
