import { db } from "@/db";
import { resumes } from "@/db/schema/resumes";
import { projects } from "@/db/schema/projects";
import { experiences } from "@/db/schema/experiences";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken";
import { z } from "zod";

// ✨ Zod schema to validate incoming data
const editResumeSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  summary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  education: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
        marks: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .optional(),
  certifications: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),

  projects: z
    .array(
      z.object({
        id: z.string().uuid(),
        title: z.string(),
        techStack: z.array(z.string()),
        liveLink: z.string().optional(),
        frontendRepo: z.string().optional(),
        backendRepo: z.string().optional(),
        description: z.string(),
      })
    )
    .optional(),

  experiences: z
    .array(
      z.object({
        id: z.string().uuid(),
        company: z.string(),
        role: z.string(),
        year: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
      })
    )
    .optional(),
});

export async function PUT(
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
    const body = await req.json();
    const parsed = editResumeSchema.parse(body);

    // ✔️ Find resume and validate ownership
    const resume = await db.query.resumes.findFirst({
      where: eq(resumes.id, resumeId),
    });

    if (!resume || resume.userId !== user.userId) {
      return NextResponse.json(
        { success: false, error: "Resume not found or access denied" },
        { status: 404 }
      );
    }

    // ✅ Update main resume data
    await db.update(resumes).set(parsed).where(eq(resumes.id, resumeId));

    // ✅ Update projects
    if (parsed.projects) {
      for (const project of parsed.projects) {
        await db
          .update(projects)
          .set({
            title: project.title,
            techStack: project.techStack,
            liveLink: project.liveLink || "",
            frontendRepo: project.frontendRepo || "",
            backendRepo: project.backendRepo || "",
            description: project.description, // ⬅️ single string update
          })
          .where(eq(projects.id, project.id));
      }
    }

    // ✅ Update experiences
    if (parsed.experiences) {
      for (const exp of parsed.experiences) {
        await db
          .update(experiences)
          .set({
            company: exp.company,
            role: exp.role,
            year: exp.year,
            startDate: exp.startDate,
            endDate: exp.endDate,
            description: exp.description, // ⬅️ single string update
          })
          .where(eq(experiences.id, exp.id));
      }
    }

    return NextResponse.json({
      success: true,
      message: "✅ Resume and related data updated successfully!",
    });
  } catch (err) {
    console.error("❌ Resume update error:", err);
    return NextResponse.json(
      { success: false, error: err || "Internal Server Error" },
      { status: 500 }
    );
  }
}
