export type ExperienceDescription = {
  id: string;
  experienceId: string;
  description: string;
};

export type EducationItem = {
  degree: string;
  institution: string;
  year: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  year: string;
  descriptions: ExperienceDescription[];
  customPrompt?: string;
};

// src/types/resume.ts (or wherever you define types)

export type ExperienceFormItem = {
  id?: string;
  createdAt?: string;
  company: string;
  role: string;
  year: string;
  customPrompt?: string;
  descriptions: {
    id?: string;
    description: string;
  }[];
};

export type ProjectItem = {
  title: string;
  techStack: string[];
  description: string;
  liveLink?: string;
  frontendRepo?: string;
  backendRepo?: string;
  customPrompt?: string;
};

export type ResumeFormData = {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  role?: string;
  stack?: string;
  experienceSummary?: string;
  prompt?: string;
  projects?: ProjectItem[];

  certifications?: string[];
  awards?: string[];
  hobbies?: string[];
  languages?: string[];
  references?: string[];
};

export type ProjectDescription = {
  id: string;
  projectId: string;
  description: string;
};

export type Project = {
  id: string;
  resumeId: string;
  userId: string | null;
  title: string;
  techStack: string[];
  liveLink?: string;
  frontendRepo?: string;
  backendRepo?: string;
  createdAt: string;
  descriptions: ProjectDescription[];
};

export type Resume = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  summary?: string;
  skills: string[];
  education: {
    degree: string;
    institution?: string;
    year: string;
  }[];
  role?: string | null;
  stack?: string | null;
  experienceSummary?: string | null;
  createdAt: string;

  projects: Project[];
  experiences: ExperienceItem[];

  certifications?: string[];
  languages?: string[];
  awards?: string[];
  hobbies?: string[];
  references?: string[];

  // ✅ Add this line
  template?: "classic" | "modern" | "minimal" | "elegant";
};
