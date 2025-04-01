import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { title, techStack, prompt: customPrompt } = await req.json();

    if (!title || !techStack) {
      return NextResponse.json(
        {
          success: false,
          description: "",
          error: "⚠️ 'title' and 'techStack' are required fields.",
        },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const finalPrompt = `
Generate a resume-style project description for the following:

- Project Title: ${title}
- Tech Stack: ${techStack}
${customPrompt ? `- Extra Note: ${customPrompt}` : ""}

Write in 2–3 bullet points or 2–3 concise sentences. Keep it professional and resume-appropriate.
Do not include labels like "Project:" or "Description:". Return only the content.
`;

    const result = await model.generateContent([finalPrompt]);
    const response = result.response;
    const description = response.text().trim();

    return NextResponse.json({ success: true, description });
  } catch (err) {
    console.error("Gemini Project Description Error:", err);
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
