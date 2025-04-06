// types/viewableResume.ts
export type ViewableExperience = {
  company: string;
  role: string;
  year: string;
  descriptions: { id: string; description: string }[];
};

export type ViewableProject = {
  title: string;
  techStack: string[];
  descriptions: { id: string; description: string }[];
  liveLink?: string;
  frontendRepo?: string;
  backendRepo?: string;
};

export type ViewableResume = {
  fullName: string;
  email: string;
  phone: string;
  summary?: string;
  skills: string[];
  role?: string | null;

  certifications?: string[];
  awards?: string[];
  hobbies?: string[];
  languages?: string[];
  references?: string[];

  education: {
    degree: string;
    institution: string;
    year: string;
  }[];

  experiences: ViewableExperience[];
  projects: ViewableProject[];
};
