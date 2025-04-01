// File: /app/api/ai/generate-experience-description/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { company, role, year, prompt: customPrompt } = await req.json();

    if (!company || !role || !year) {
      return NextResponse.json(
        {
          success: false,
          description: "",
          error: "⚠️ 'company', 'role', and 'year' are required fields.",
        },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const finalPrompt = `
Generate a resume experience section based on the following:

- Company: ${company}
- Role: ${role}
- Year: ${year}

${customPrompt ? `Additional Instructions: ${customPrompt}` : ""}

Write it in 2-3 bullet points or brief sentences. Avoid generic fluff. Use professional tone.
`;

    const result = await model.generateContent([finalPrompt]);
    const response = result.response;
    const description = response.text().trim();

    return NextResponse.json({ success: true, description });
  } catch (err) {
    console.error("Gemini AI Experience Error:", err);
    return NextResponse.json(
      {
        success: false,
        description: "",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
