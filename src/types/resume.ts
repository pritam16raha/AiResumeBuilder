export type ExperienceDescription = {
  id: string;
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
  description: string; // Single string description
  customPrompt?: string;
};

export type ExperienceItemForEditForm = {
  id: string;
  company: string;
  role: string;
  year: string;
  descriptions: string;
};

export type ResumeEditData = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  languages: string[];
  awards: string[];
  hobbies: string[];
  references: string[];
  projects: {
    id: string;
    title: string;
    techStack: string[];
    liveLink: string;
    frontendRepo: string;
    backendRepo: string;
    description: string;
  }[];
  experiences: {
    id: string;
    company: string;
    role: string;
    year: string;
    description: string;
  }[];
};




// src/types/resume.ts (or wherever you define types)

export type ExperienceFormItem = {
  company: string;
  role: string;
  year: string;
  description: string;
  customPrompt?: string;
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
  descriptions: string;
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
    institution: string;
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
