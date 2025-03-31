import { NextRequest, NextResponse } from "next/server";
import { saveResume } from "@/server/actions/saveResume";
import { verifyAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = verifyAuth(req);
    const body = await req.json();
    const resumePayload = {
      ...body,
      userId: user.userId,
    };
    const result = await saveResume(resumePayload);
    return NextResponse.json({ success: true, resume: result });
  } catch (err) {
    console.error("Resume Save Failed:", err);
    return NextResponse.json(
      { success: false, error: "Unauthorized or failed to save resume." },
      { status: 401 }
    );
  }
}
