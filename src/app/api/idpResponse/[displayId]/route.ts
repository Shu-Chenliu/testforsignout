import { NextRequest, NextResponse } from "next/server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { idpResponseTable } from "@/db/schema";

export async function GET(
  // eslint-disable-next-line
  req: NextRequest,
  {
    params,
  }: {
    params: {
      displayId: string;
    };
  }
) {
  try {
    const [idpResponse] = await db
      .select({
        email:  idpResponseTable.email,
        semester:idpResponseTable.semester,
        status:  idpResponseTable.status,
        response: idpResponseTable.response,
      })
      .from(idpResponseTable)
      .where(
        and(
            eq(idpResponseTable.displayId, params.displayId),
        ),
    );
    
    if (!idpResponse) {
      return NextResponse.json({ error: `response DNE` }, { status: 404 });
    }

    return NextResponse.json(
      {
        email: idpResponse.email,
        semester: idpResponse.semester,
        status:  idpResponse.status,
        response: idpResponse.response,
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