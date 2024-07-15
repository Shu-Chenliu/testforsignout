import { NextResponse, type NextRequest } from "next/server";

import { and,eq } from "drizzle-orm";

import { db } from "@/db";
import { courseRecordTable } from "@/db/schema";


import { z } from "zod";

const recordSchema = z.object({
  studentEmail:z.string(),
  courseId:z.string(),
  qualification1:z.string().optional(),
  qualification2:z.string().optional(),
  quantification1:z.string().optional(),
  quantification2:z.string().optional(),
});
const deleteRecordSchema=z.object({
  studentEmail:z.string(),
  courseId:z.string(),
});
type PostRecordRequest = z.infer<typeof recordSchema>;
type updateRecordRequest = z.infer<typeof recordSchema>;
type deleteRecordRequest = z.infer<typeof deleteRecordSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    recordSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { studentEmail,courseId,qualification1,qualification2,quantification1,quantification2 } = data as PostRecordRequest;
  console.log({
    studentEmail,
    courseId,
    qualification1,
    qualification2,
    quantification1,
    quantification2
  })
  await db
    .insert(courseRecordTable)
    .values({
      studentEmail,
      courseId,
      qualification1,
      qualification2,
      quantification1,
      quantification2
    })

  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    recordSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { studentEmail,courseId,qualification1,qualification2,quantification1,quantification2 } = data as updateRecordRequest;
  await db
    .update(courseRecordTable)
    .set({qualification1,qualification2,quantification1,quantification2})
    .where(and(eq(courseRecordTable.studentEmail, studentEmail), eq(courseRecordTable.courseId, courseId)));
  return new NextResponse("OK", { status: 200 });
}
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteRecordSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { studentEmail,courseId } = data as deleteRecordRequest;
  await db
    .delete(courseRecordTable)
    .where(and(eq(courseRecordTable.studentEmail, studentEmail), eq(courseRecordTable.courseId, courseId)));
  return new NextResponse("OK", { status: 200 });
}