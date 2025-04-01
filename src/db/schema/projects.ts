import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { resumes } from "./resumes";
import { relations } from "drizzle-orm";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  resumeId: uuid("resume_id").references(() => resumes.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  techStack: text("tech_stack").array().notNull(),
  liveLink: text("live_link"),
  frontendRepo: text("frontend_repo"),
  backendRepo: text("backend_repo"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  resume: one(resumes, {
    fields: [projects.resumeId],
    references: [resumes.id],
  }),
}));
