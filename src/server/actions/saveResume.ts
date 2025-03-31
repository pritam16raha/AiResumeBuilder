import { db } from "@/db";
import { resumes } from "@/db/schema/resumes";
import { eq } from "drizzle-orm";

type EducationItem = {
  degree: string;
  institution?: string;
  year: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  year: string;
};

type ResumePayload = {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  summary?: string;
  skills?: string[];
  education?: EducationItem[];
  experience?: ExperienceItem[];
};

export async function saveResume(data: ResumePayload) {
  const result = await db
    .insert(resumes)
    .values({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      summary: data.summary || "",
      skills: data.skills || [],
      education: data.education || [],
      experience: data.experience || [],
    })
    .returning();

  return result;
}
