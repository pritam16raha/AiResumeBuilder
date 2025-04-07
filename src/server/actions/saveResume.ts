import { db } from "@/db";
import { resumes } from "@/db/schema/resumes";
import { projects } from "@/db/schema/projects";
import { experiences } from "@/db/schema/experiences";

type ResumePayload = {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  summary?: string;
  skills?: string[];
  education?: {
    degree: string;
    institution?: string;
    year: string;
  }[];
  experience?: {
    company: string;
    role: string;
    year: string;
    description?: string;
  }[];
  projects?: {
    title: string;
    techStack: string[];
    description: string;
    liveLink?: string;
    frontendRepo?: string;
    backendRepo?: string;
    customPrompt?: string;
  }[];

  certifications?: string[];
  languages?: string[];
  awards?: string[];
  hobbies?: string[];
  references?: string[];
};

export async function saveResume(data: ResumePayload) {
  // Step 1: Save resume
  const resumeResult = await db
    .insert(resumes)
    .values({
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      summary: data.summary || "",
      skills: data.skills || [],
      education: data.education || [],
      certifications: data.certifications || [],
      languages: data.languages || [],
      awards: data.awards || [],
      hobbies: data.hobbies || [],
      references: data.references || [],
    })
    .returning({ id: resumes.id });

  const resumeId = resumeResult[0].id;

  // Step 2: Save projects
  if (data.projects && data.projects.length > 0) {
    for (const project of data.projects) {
      await db.insert(projects).values({
        resumeId,
        userId: data.userId,
        ...project,
      });
    }
  }

  // Step 3: Save experiences
  // Step 3: Save experiences
  if (data.experience && data.experience.length > 0) {
    for (const exp of data.experience) {
      await db
        .insert(experiences)
        .values({
          userId: data.userId,
          resumeId: resumeId,
          company: exp.company,
          role: exp.role,
          year: exp.year,
          description: exp.description || "", // Make sure to include `description`
        })
        .execute();
    }
  }
}
