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
      { degree: string; institution?: string; year: string }[]
    >(),

  createdAt: timestamp("created_at").defaultNow(),

  role: text("role"),
  stack: text("stack"),
  experienceSummary: text("experience_summary"),
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
