import { pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const planEnum = pgEnum("plan", ["free", "pro", "enterprise"]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  plan: planEnum("plan").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
