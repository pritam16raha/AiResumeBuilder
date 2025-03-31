import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const aiLogs = pgTable("ai_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(),
  input: text("input"),
  output: text("output"),
  createdAt: timestamp("created_at").defaultNow(),
});
