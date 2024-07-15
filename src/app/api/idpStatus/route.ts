import { NextResponse, type NextRequest } from "next/server";

import {  eq } from "drizzle-orm";

import { db } from "@/db";
import { idpStatusTable } from "@/db/schema";
import { z } from "zod";

const postNewSemesterStatusSchema = z.object({
  semester: z.string(),
  updateTime: z.string(),
  idpVersion: z.number(),
  released: z.boolean(),
});
const updateIdpStatusSchema = z.object({
  semester: z.string(),
  updateTime: z.string(),
  idpVersion: z.number().optional(),
  released: z.boolean().optional()
});
type postNewSemesterStatusRequest = z.infer<typeof postNewSemesterStatusSchema>;
type updateIdpStatusRequest = z.infer<typeof updateIdpStatusSchema>;

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  console.log(requestData);
  try {
    postNewSemesterStatusSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { semester, updateTime, idpVersion, released } = requestData as postNewSemesterStatusRequest;
  await db
    .insert(idpStatusTable)
    .values({semester, updateTime, versionId:idpVersion, released})
  return new NextResponse("OK", { status: 200 });
}

export async function PUT(request: NextRequest) {
  const requestData = await request.json();
  try {
    updateIdpStatusSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { semester, updateTime, idpVersion, released } = requestData as updateIdpStatusRequest;
  await db
    .update(idpStatusTable)
    .set({versionId:idpVersion??idpVersion,
      released:released??released,
      updateTime:updateTime})
    // check!!
    .where(eq(idpStatusTable.semester, semester))
  return new NextResponse("OK", { status: 200 });
}

export async function GET() {
  try {
    const idpStatus = await db
      .select({
        semester:  idpStatusTable.semester,
        versionId: idpStatusTable.versionId,
        updateTime: idpStatusTable.updateTime,
        released:  idpStatusTable.released,
      })
      .from(idpStatusTable);
    
    if (!idpStatus) {
      return NextResponse.json({ error: `no idp status available` }, { status: 404 });
    }
    idpStatus.sort((a, b) => a.semester.localeCompare(b.semester));

    return NextResponse.json(
      {
        idpStatus: idpStatus,
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