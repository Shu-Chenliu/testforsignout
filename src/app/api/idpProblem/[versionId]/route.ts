import { NextRequest, NextResponse } from "next/server";

import {  eq } from "drizzle-orm";

import { db } from "@/db";
import { idpProblemTable } from "@/db/schema";

export async function GET(
  // eslint-disable-next-line
  req: NextRequest,
  {
    params,
  }: {
    params: {
      versionId: number;
    };
  },
) {
  try {
    // console.log("in get")
    const [idpProblem] = await db
      .select({
        versionId:idpProblemTable.versionId,
        data:     idpProblemTable.data,
      })
      .from(idpProblemTable)
      .where(
        eq(idpProblemTable.versionId, params.versionId),
    );
    // console.log("get"); 
    // console.log(idpProblem);
    
    if (!idpProblem) {
      return NextResponse.json({ error: "version Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        versionId: idpProblem.versionId,
        data: idpProblem.data,
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