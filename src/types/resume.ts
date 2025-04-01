export type EducationItem = {
  degree: string;
  institution: string;
  year: string;
};

export type ExperienceItem = {
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
};




