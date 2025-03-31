// src/db/index.ts

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema"; // 👈 import your schema

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema }); // 👈 pass schema here
