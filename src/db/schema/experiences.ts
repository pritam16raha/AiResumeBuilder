// src/db/schema/experiences.ts

import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { resumes } from "./resumes";
import { relations } from "drizzle-orm";

export const experiences = pgTable("experiences", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  resumeId: uuid("resume_id")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  company: text("company").notNull(),
  role: text("role").notNull(),
  year: text("year").notNull(),
  startDate: text("start_date").notNull(), // NEW
  endDate: text("end_date").notNull(), // NEW
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// export const experienceRelations = relations(experiences, ({ one, many }) => ({
//   resume: one(resumes, {
//     fields: [experiences.resumeId],
//     references: [resumes.id],
//   }),
//   user: one(users, {
//     fields: [experiences.userId],
//     references: [users.id],
//   }),
//   descriptions: many(experienceDescriptions),
// }));

export const experienceRelations = relations(experiences, ({ one }) => ({
  resume: one(resumes, {
    fields: [experiences.resumeId],
    references: [resumes.id],
  }),
  user: one(users, {
    fields: [experiences.userId],
    references: [users.id],
  }),
}));





