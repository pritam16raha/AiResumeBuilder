// src/server/controllers/userController.ts

import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET!;

export const userController = {
  // ✅ Register User
  async register(body: { name: string; email: string; password: string }) {
    const { name, email, password } = body;

    const existing = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, name, email },
    });
  },

  // ✅ Login User
  async login(body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, email },
    });
  },

  // ✅ Update User
  async update(body: { userId: string; name?: string; password?: string }) {
    const { userId, name, password } = body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    await db
      .update(users)
      .set({
        ...(name && { name }),
        ...(hashedPassword && { password: hashedPassword }),
      })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true, message: "User updated" });
  },

  // ✅ Delete User
  async delete(body: { userId: string }) {
    const { userId } = body;

    await db.delete(users).where(eq(users.id, userId));

    return NextResponse.json({ success: true, message: "User deleted" });
  },
};
