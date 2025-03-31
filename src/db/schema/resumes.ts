import { pgTable, text, uuid, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const resumes = pgTable("resumes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  summary: text("summary"),
  skills: jsonb("skills").$type<string[]>(),
  education: jsonb("education"),
  experience: jsonb("experience"),
  createdAt: timestamp("created_at").defaultNow(),
});
