import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { courseTable } from "@/db/schema";


import { z } from "zod";

const postCourseSchema = z.object({
  year: z.string(),
  series:z.string(),
  courseId: z.string().min(1).max(50),
  name: z.string().min(1).max(100),
  teachername:z.string(),
  typeId: z.string(),
  date:z.string(),
});
const updateCourseSchema=z.object({
  courseId:z.string().min(1).max(50),
  name: z.string().min(1).max(50),
});
const deleteCourseSchema=z.object({
  courseId:z.string().min(1).max(50),
});
type PostCourseRequest = z.infer<typeof postCourseSchema>;
type updateCourseRequest = z.infer<typeof updateCourseSchema>;
type deleteCourseRequest = z.infer<typeof deleteCourseSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postCourseSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { year,series,courseId,name,teachername,typeId,date} = data as PostCourseRequest;
  await db
    .insert(courseTable)
    .values({
      year,
      series,
      courseId,
      name,
      teachername,
      typeId,
      date,
    })

  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateCourseSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { courseId,name } = data as updateCourseRequest;
  await db
    .update(courseTable)
    .set({name})
    .where(eq(courseTable.courseId, courseId));
  return new NextResponse("OK", { status: 200 });
}
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteCourseSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { courseId } = data as deleteCourseRequest;
  await db
    .delete(courseTable)
    .where(eq(courseTable.courseId, courseId))
  return new NextResponse("OK", { status: 200 });
}