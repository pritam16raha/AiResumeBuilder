import { db } from "@/db";
import { resumes } from "@/db/schema/resumes";
import { projects } from "@/db/schema/projects";
import { projectDescriptions } from "@/db/schema/projectDescriptions";
import { experiences } from "@/db/schema/experiences";
import { experienceDescriptions } from "@/db/schema/experienceDescriptions";

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
    })
    .returning({ id: resumes.id });

  const resumeId = resumeResult[0].id;

  // Step 2: Save projects and their descriptions
  if (data.projects && data.projects.length > 0) {
    for (const project of data.projects) {
      const { description, ...projectData } = project;

      const insertedProjects = await db
        .insert(projects)
        .values({
          resumeId,
          userId: data.userId,
          ...projectData,
        })
        .returning({ id: projects.id });

      const projectId = insertedProjects[0].id;

      if (description) {
        await db.insert(projectDescriptions).values({
          projectId,
          description,
        });
      }
    }
  }

  // Step 3: Save experiences and their descriptions
  if (data.experience && data.experience.length > 0) {
    for (const exp of data.experience) {
      const { description, ...expData } = exp;

      const insertedExperiences = await db
        .insert(experiences)
        .values({
          resumeId,
          userId: data.userId,
          ...expData,
        })
        .returning({ id: experiences.id });

      const experienceId = insertedExperiences[0].id;

      if (description) {
        await db.insert(experienceDescriptions).values({
          experienceId,
          description,
        });
      }
    }
  }

  return { success: true };
}
