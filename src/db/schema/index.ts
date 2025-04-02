// src/db/schema/index.ts
import { resumes, resumeRelations } from "./resumes";
import { users } from "./users";
import { projects, projectRelations } from "./projects";
import {
  projectDescriptionRelations,
  projectDescriptions,
} from "./projectDescriptions";
import { experiences, experienceRelations } from "./experiences";
import {
  experienceDescriptions,
  experienceDescriptionsRelations,
} from "./experienceDescriptions";

export const schema = {
  users,
  resumes,
  resumeRelations,
  projects,
  projectRelations,
  projectDescriptions,
  experiences,
  experienceRelations,
  experienceDescriptions,
  projectDescriptionRelations,
  experienceDescriptionsRelations,
};
