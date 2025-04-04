// src/db/schema/experience_descriptions.ts

import { pgTable, uuid, text } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { experiences } from "./experiences";

export const experienceDescriptions = pgTable("experience_descriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  experienceId: uuid("experience_id")
    .notNull()
    .references(() => experiences.id, {
      onDelete: "cascade",
    }),
  description: text("description").notNull(),
});

export const experienceDescriptionsRelations = relations(
  experienceDescriptions,
  ({ one }) => ({
    experience: one(experiences, {
      fields: [experienceDescriptions.experienceId],
      references: [experiences.id],
    }),
  })
);
