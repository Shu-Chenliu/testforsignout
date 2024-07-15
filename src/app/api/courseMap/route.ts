import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { courseMapTable } from "@/db/schema";


import { z } from "zod";

const postMapSchema = z.object({
  id:z.string(),
  bigCategory:z.string(),
  middleCategory:z.string(),
  smallCategory:z.string(),
  required:z.boolean(),
  applicable:z.string(),
});
const updateMapSchema=z.object({
  id:z.string(),
  bigCategory:z.string().optional(),
  middleCategory:z.string().optional(),
  smallCategory:z.string().optional(),
});
const deleteMapSchema=z.object({
  id:z.string(),
});
type PostMapRequest = z.infer<typeof postMapSchema>;
type updateMapRequest = z.infer<typeof updateMapSchema>;
type deleteMapRequest = z.infer<typeof deleteMapSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postMapSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,bigCategory,middleCategory,smallCategory,required,applicable} = data as PostMapRequest;
  await db
    .insert(courseMapTable)
    .values({
      id,
      bigCategory,
      middleCategory,
      smallCategory,
      required,
      applicable,
    })

  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateMapSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,bigCategory,middleCategory,smallCategory } = data as updateMapRequest;
  await db
    .update(courseMapTable)
    .set({bigCategory,middleCategory,smallCategory})
    .where(eq(courseMapTable.id, id));
  return new NextResponse("OK", { status: 200 });
}
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteMapSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id } = data as deleteMapRequest;
  await db
    .delete(courseMapTable)
    .where(eq(courseMapTable.id, id));
  return new NextResponse("OK", { status: 200 });
}