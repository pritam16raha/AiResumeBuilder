import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { relations } from "drizzle-orm";

export const projectDescriptions = pgTable("project_descriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  description: text("description").notNull(),
});

export const projectDescriptionRelations = relations(
  projectDescriptions,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectDescriptions.projectId],
      references: [projects.id],
    }),
  })
);
