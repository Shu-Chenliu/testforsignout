import { NextRequest, NextResponse } from "next/server";

import {  eq } from "drizzle-orm";

import { db } from "@/db";
import { idpStatusTable } from "@/db/schema";

export async function GET(
  // eslint-disable-next-line
  req: NextRequest,
  {
    params,
  }: {
    params: {
      semester: string;
    };
  },
) {
  try {
    const [idpStatus] = await db
      .select({
        versionId: idpStatusTable.versionId,
        released:  idpStatusTable.released,
      })
      .from(idpStatusTable)
      .where(
        eq(idpStatusTable.semester, params.semester),
    );
    
    if (!idpStatus) {
      return NextResponse.json({ error: `semester ${params.semester} has not come yet` }, { status: 404 });
    }

    return NextResponse.json(
      {
        versionId: idpStatus.versionId,
        released:  idpStatus.released
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