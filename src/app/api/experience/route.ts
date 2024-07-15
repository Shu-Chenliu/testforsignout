import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { experiencesTable } from "@/db/schema";
import { z } from "zod";

const postNewExperienceSchema = z.object({
  email: z.string(),
  semester: z.string(),
  school: z.string(),
  position: z.string(),
  subject: z.string(),
  role: z.string(),
  feature: z.string(),
});
const updateExperienceSchema = z.object({
  id: z.number(),
  school: z.string().optional(),
  position: z.string().optional(),
  subject: z.string().optional(),
  role: z.string().optional(),
  feature: z.string().optional(),
});
type postNewSemesterStatusRequest = z.infer<typeof postNewExperienceSchema>;
type updateIdpStatusRequest = z.infer<typeof updateExperienceSchema>;

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  console.log(requestData);
  try {
    postNewExperienceSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { email, semester, school, position, subject, role, feature } = requestData as postNewSemesterStatusRequest;
  await db
    .insert(experiencesTable)
    .values({email, semester, school, position, subject, role, feature})
  return NextResponse.json({message: "OK"},{ status: 200 });
}

export async function PUT(request: NextRequest) {
  const requestData = await request.json();
  try {
    updateExperienceSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id, school, position, subject, role, feature } = requestData as updateIdpStatusRequest;
  await db
    .update(experiencesTable)
    .set({school, position, subject, role, feature})
    // check!!
    .where(eq(experiencesTable.id, id))
  return new NextResponse("OK", { status: 200 });
}

export async function GET() {
  try {
    const experiencesStatus = await db
      .select({
        email: experiencesTable.email,
        semester: experiencesTable.semester,
        school: experiencesTable.school, 
        position: experiencesTable.position, 
        subject: experiencesTable.subject, 
        role: experiencesTable.role, 
        feature: experiencesTable.feature
      })
      .from(experiencesTable);
    
    if (!experiencesStatus) {
      return NextResponse.json({ error: `no idp status available` }, { status: 404 });
    }

    return NextResponse.json(
      {
        experiencesStatus: experiencesStatus,
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