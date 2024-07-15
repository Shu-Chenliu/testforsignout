import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { z } from "zod";
// const getUserSchema=z.object({
//   email:z.string().optional(),
//   mobile:z.string().optional(),
// })
// const getUserByMobileSchema=z.object({
//   mobile:z.string(),
// })
const postUserSchema=z.object({
  username:z.string(),
  email:z.string(),
  mobile:z.string(),
  hashedPassword:z.string(),
  authority:z.string(),
});
const updateUserSchema=z.object({
  id:z.string(),
  username:z.string().optional(),
  authority:z.string().optional(),
  disable:z.boolean().optional(),
  hashedPassword:z.string().optional(),
  mobile:z.string().optional(),
  imageURL:z.string().optional(),
});
// type getUserRequest=z.infer<typeof getUserSchema>;
// type getUserByMobileRequest=z.infer<typeof getUserByMobileSchema>;
type postUserRequest = z.infer<typeof postUserSchema>;
type updateUserRequest = z.infer<typeof updateUserSchema>;
// export async function GET(request: NextRequest){
//   const data = await request.json();
//   try {
//     getUserByMobileSchema.parse(data);
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }
//   const { mobile } = data as getUserByMobileRequest;
//   const userData =await db.select({
//     email:usersTable.email,
//     Password:usersTable.hashedPassword,
//   })
//     .from(usersTable)
//     .where(eq(usersTable.mobile,mobile));
  
//   return new NextResponse("OK", { status: 200 });
// } 
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data)
  try {
    postUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { username,email,mobile,hashedPassword,authority } = data as postUserRequest;
  const [user] = await db
    .insert(usersTable)
    .values({username,email,mobile,hashedPassword,authority})
    .returning()
  console.log("POST")
  return NextResponse.json(
    {
      user,
    }, { 
      status: 200 
    });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,username,authority,disable,hashedPassword,mobile,imageURL } = data as updateUserRequest;
  await db
    .update(usersTable)
    .set({username,authority,disable,hashedPassword,mobile,imageURL})
    .where(eq(usersTable.displayId, id))
  return new NextResponse("OK", { status: 200 });
}

export async function GET() {
  try {
    const usersStatus = await db
      .select({
        id: usersTable.id,
        displayId: usersTable.displayId,
        authority: usersTable.authority,
        email: usersTable.email,
        phoneNumber: usersTable.mobile,
        disable: usersTable.disable,
        username: usersTable.username
      })
      .from(usersTable);
    
    if (!usersStatus) {
      return NextResponse.json({ error: `no idp status available` }, { status: 404 });
    }

    return NextResponse.json(
      {
        usersStatus: usersStatus,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}