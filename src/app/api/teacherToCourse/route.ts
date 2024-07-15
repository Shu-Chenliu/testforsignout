import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { z } from "zod";
import { teacherToCourse } from "@/db/schema";

const postStudentSchema=z.object({
  teacherEmail:z.string(),
  courseId:z.string(),
});

type postStudentRequest = z.infer<typeof postStudentSchema>;

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postStudentSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { teacherEmail,courseId } = data as postStudentRequest;
  await db
    .insert(teacherToCourse)
    .values({
      teacherEmail,
      courseId,
    })
  return new NextResponse("OK", { status: 200 });
}
