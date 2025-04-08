// src/db/schema/resumes.ts

import { pgTable, text, uuid, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { experiences } from "./experiences";

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  summary: text("summary"),

  skills: jsonb("skills").$type<string[]>(),

  education:
    jsonb("education").$type<
      {
        degree: string;
        institution: string;
        year: string;
        marks: string;
        startDate: string;
        endDate: string;
      }[]
    >(),

  createdAt: timestamp("created_at").defaultNow(),

  role: text("role"),
  stack: text("stack"),
  experienceSummary: text("experience_summary"),
  // ✅ NEW FIELDS
  certifications: jsonb("certifications").$type<string[]>(),
  languages: jsonb("languages").$type<string[]>(),
  awards: jsonb("awards").$type<string[]>(),
  hobbies: jsonb("hobbies").$type<string[]>(),
  references: jsonb("references").$type<string[]>(),
});

// ✅ Resume relations (no need to store project/experience IDs in resume)
export const resumeRelations = relations(resumes, ({ one, many }) => ({
  user: one(users, {
    fields: [resumes.userId],
    references: [users.id],
  }),
  projects: many(projects),
  experiences: many(experiences),
}));
