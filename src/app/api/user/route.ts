import { NextRequest, NextResponse } from "next/server";
import { userController } from "@/server/controllers/userController";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    switch (body.type) {
      case "register":
        return userController.register(body);
      case "login":
        return userController.login(body);
      default:
        return NextResponse.json(
          { success: false, message: "Invalid action type" },
          { status: 400 }
        );
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
    console.log(err);
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return userController.update(body);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  return userController.delete(body);
}
