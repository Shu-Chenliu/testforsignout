import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { idpResponseTable } from "@/db/schema";
import { z } from "zod";

const postIdpResponseSchema = z.object({
  email: z.string(),
  semester: z.string(),
});
const updateIdpResponseSchema = z.object({
    displayId: z.string(),
    status: z.string().optional(),
    notes: z.string().optional()
});
type postIdpResponseRequest = z.infer<typeof postIdpResponseSchema>;
type updateIdpResponseRequest = z.infer<typeof updateIdpResponseSchema>;

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  console.log(requestData);
  try {
    postIdpResponseSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { email, semester } = requestData as postIdpResponseRequest;
  // console.log({email,semester})
  await db
    .insert(idpResponseTable)
    .values({email, semester, updateTime: new Date().toLocaleString()})
  return new NextResponse("OK", { status: 200 });
}

export async function PUT(request: NextRequest) {
  const requestData = await request.json();
  try {
    updateIdpResponseSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { displayId,status,notes } = requestData as updateIdpResponseRequest;
  if (notes) {
    console.log("update principal notes")
    await db
      .update(idpResponseTable)
      .set({ notes,displayId })
      .where(eq(idpResponseTable.displayId, displayId))
  }
  else if (status) {
    console.log("update status")
    await db
      .update(idpResponseTable)
      .set({
        status:status,
        response:requestData.response??idpResponseTable.response,
        updateTime:new Date().toLocaleString()
      })
      .where(eq(idpResponseTable.displayId, displayId))
  }
  else {
    console.log("only update response")
    await db
      .update(idpResponseTable)
      .set({
        response:requestData.response??idpResponseTable.response,
        updateTime:new Date().toLocaleString()
      })
      .where(eq(idpResponseTable.displayId, displayId))
  }
  return new NextResponse("OK", { status: 200 });
}