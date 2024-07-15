import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const mobile = url.searchParams.get('mobile');

  if (!email && !mobile) {
    return NextResponse.json({ error: "Email or phone is required" }, { status: 400 });
  }

  const condition = email ? eq(usersTable.email, email) : eq(usersTable.mobile, mobile!);

  try {
    const userData = await db.select({
      mobile: usersTable.mobile,
      hashedPassword: usersTable.hashedPassword,
      email: usersTable.email,
      displayId:usersTable.displayId,
    })
    .from(usersTable)
    .where(condition);

    if (userData.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const user = userData[0];
    // Avoid sending sensitive data like hashedPassword to the client
    return NextResponse.json({ mobile: user.mobile, email: user.email,displayId:user.displayId }, { status: 200 });
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}