import { NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { idpResponseTable } from "@/db/schema";

export async function GET(
  // eslint-disable-next-line
  req: NextRequest,
  {
    params,
  }: {
    params: {
      semester: string;
    };
  }
) {
  try {
    const idpResponse = await db
      .select({
        status:  idpResponseTable.status,
        response: idpResponseTable.response,
        displayId: idpResponseTable.displayId,
        semester: idpResponseTable.semester,
      })
      .from(idpResponseTable)
      .where(
        eq(idpResponseTable.semester, params.semester)
    );
    
    if (!idpResponse) {
      return NextResponse.json({ error: `response DNE` }, { status: 404 });
    }

    return NextResponse.json(
      {
        idpResponse: idpResponse,
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