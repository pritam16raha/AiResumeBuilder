// src/app/api/my-resumes/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { db } from "@/db";
import { resumes } from "@/db/schema/resumes";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const user = verifyAuth(req);
    const result = await db
      .select({
        id: resumes.id,
        fullName: resumes.fullName,
        summary: resumes.summary,
        createdAt: resumes.createdAt,
      })
      .from(resumes)
      .where(eq(resumes.userId, user.userId))
      .orderBy(desc(resumes.createdAt));

    return NextResponse.json({ success: true, resumes: result });
  } catch (err) {
    console.error("Failed to fetch user resumes:", err);
    return NextResponse.json(
      { success: false, error: "Unauthorized or failed to fetch resumes" },
      { status: 401 }
    );
  }
}
