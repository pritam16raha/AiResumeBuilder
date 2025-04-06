// src/app/api/contact/route.ts

import { db } from "@/db";
import { contacts } from "@/db/schema/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields required" },
        { status: 400 }
      );
    }

    await db.insert(contacts).values({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
