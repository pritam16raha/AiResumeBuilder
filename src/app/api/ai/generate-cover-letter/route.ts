// src/app/api/ai/generate-cover-letter/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const inputSchema = z.object({
  fullName: z.string(),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      year: z.string(),
      marks: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  ),
  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      year: z.string(),
      description: z.string(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  ),
  role: z.string().nullable().optional(),
  prompt: z.string().optional(),
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = inputSchema.parse(body);

    const { fullName, education, experience, role, prompt } = parsed;

    const eduText = education
      .map((e) => {
        const duration =
          e.startDate || e.endDate
            ? ` (${e.startDate || "N/A"} – ${e.endDate || "N/A"})`
            : "";
        const marks = e.marks ? ` - Marks: ${e.marks}` : "";
        return `${e.degree} from ${e.institution} (${e.year})${duration}${marks}`;
      })
      .join("\n");

    const expText = experience
      .map((exp) => {
        const duration =
          exp.startDate || exp.endDate
            ? ` (${exp.startDate || "N/A"} – ${exp.endDate || "N/A"})`
            : "";
        return `${exp.role} at ${exp.company} (${exp.year})${duration}\n- ${exp.description}`;
      })
      .join("\n\n");

    const finalPrompt = `
Write a professional cover letter for ${role || "a suitable position"}.

Candidate Name: ${fullName}

${prompt ? `Job Notes: ${prompt}\n\n` : ""}
Education:
${eduText}

Experience:
${expText}

Keep it concise, professional, and tailored for the role. Include a closing.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ coverLetter: text });
  } catch (err) {
    console.error("❌ Cover letter generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
