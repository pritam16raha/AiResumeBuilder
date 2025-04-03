// src/db/schema/coverLetters.ts

import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { resumes } from "./resumes";

export const coverLetters = pgTable("cover_letters", {
  id: uuid("id").defaultRandom().primaryKey(),
  resumeId: uuid("resume_id").references(() => resumes.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
