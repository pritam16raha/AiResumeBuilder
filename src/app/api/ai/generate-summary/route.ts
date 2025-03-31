import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const {
      fullName,
      role,
      stack,
      experience,
      prompt: customPrompt,
    } = await req.json();

    // 🚫 Check for unrealistic prompts
    if (customPrompt?.toLowerCase().includes("15000")) {
      return NextResponse.json(
        {
          success: false,
          summary: "",
          error:
            "⚠️ Sorry, the summary length is too long. Please keep it under 300–400 words.",
        },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // ✅ Smart Prompt Engineering
    const finalPrompt = `
Generate a professional and concise resume summary based on the following:

- Full Name: ${fullName}
- Role: ${role}
- Tech Stack: ${stack}
- Experience: ${experience}

${customPrompt ? `User Instruction: ${customPrompt}` : ""}

Write it in 2–3 sentences in a formal tone.
Do not include labels like "Summary:" or "Resume:" — only the final text.
`;

    const result = await model.generateContent([finalPrompt]);
    const response = result.response;
    const summary = response.text().trim();

    return NextResponse.json({ success: true, summary });
  } catch (err) {
    console.error("Gemini AI Error:", err);
    return NextResponse.json(
      {
        success: false,
        summary: "",
        error: (err as Error).message,
      },
      { status: 500 }
    );
  }
}
