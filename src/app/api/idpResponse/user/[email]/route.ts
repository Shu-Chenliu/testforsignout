import { NextResponse, type NextRequest } from "next/server";

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
      email: string;
    };
  }
) {
  try {
    const idpResponse = await db
      .select({
        status:  idpResponseTable.status,
        response: idpResponseTable.response,
        displayId: idpResponseTable.displayId,
        email: idpResponseTable.email,
        updateTime: idpResponseTable.updateTime,
        semester: idpResponseTable.semester,
      })
      .from(idpResponseTable)
      .where(
        eq(idpResponseTable.email, params.email),
    );
    idpResponse.sort((a, b) => a.semester.localeCompare(b.semester));
    
    if (!idpResponse) {
      return NextResponse.json({ error: `response DNE` }, { status: 404 });
    }

    return NextResponse.json(
      {
        idpResponse: idpResponse
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
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