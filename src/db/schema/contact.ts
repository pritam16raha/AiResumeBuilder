// src/db/schema/contact.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
