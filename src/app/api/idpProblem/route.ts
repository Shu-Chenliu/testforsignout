import { NextResponse, type NextRequest } from "next/server";

import {  eq } from "drizzle-orm";

import { db } from "@/db";
import { idpProblemTable } from "@/db/schema";
import { z } from "zod";

const cellSchema = z.object({
  id: z.string(),
  type: z.string(),
  bold: z.boolean(),
  color: z.string(),
  history: z.string(),
  more: z.string(),
  size: z.number(),
  content: z.string(),
  rowSpan: z.string(),
  colSpan: z.string(),
  simplifiedVersion: z.boolean(),
});

const dataSchema = z.object({
  sectionId: z.string(),
  sectionName: z.string(),
  width: z.number().array(),
  sectionData: cellSchema.array().array(),
}).array();

const postIdpProblemSchema = z.object({
  data: dataSchema
});
const updateIdpProblemSchema = z.object({
  versionId: z.number(),
  data: dataSchema
});
type postIdpProblemRequest = z.infer<typeof postIdpProblemSchema>;
type updateIdpProblemRequest = z.infer<typeof updateIdpProblemSchema>;

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  console.log(requestData);
  try {
    postIdpProblemSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { data } = requestData as postIdpProblemRequest;
  const [posted] = await db
    .insert(idpProblemTable)
    .values({data})
    .returning()
  // return new NextResponse("OK", { status: 200 });
  return NextResponse.json(
    {
      posted
    },
    { status: 200 },
  );
}

export async function PUT(request: NextRequest) {
  const requestData = await request.json();
  try {
    updateIdpProblemSchema.parse(requestData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { versionId, data } = requestData as updateIdpProblemRequest;
  await db
    .update(idpProblemTable)
    .set({data})
    .where(eq(idpProblemTable.versionId, versionId))
  return new NextResponse("OK", { status: 200 });
}

export async function GET() {
  try {
    const idpProblems = await db
      .select({
        versionId:idpProblemTable.versionId,
      })
      .from(idpProblemTable)
      .orderBy(idpProblemTable.versionId);
    ;

    return NextResponse.json(
      {
        idpProblems
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