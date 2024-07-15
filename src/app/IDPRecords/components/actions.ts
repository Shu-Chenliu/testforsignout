import { db } from "@/db";
import { experiencesTable, idpProblemTable, idpResponseTable, idpStatusTable, usersTable } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
export const getData=async()=>{
  "use server";
  const responses = await db
    .select({
      responseDisplayId:idpResponseTable.displayId,
      semester:idpResponseTable.semester,
      updateTime:idpResponseTable.updateTime,
      status: idpResponseTable.status,
      response:idpResponseTable.response,
      notes: idpResponseTable.notes,
      school: experiencesTable.school??"",
      username: usersTable.username??"",
      versionId: idpStatusTable.versionId,
      data: idpProblemTable.data,
    })
    .from(idpResponseTable)
    .leftJoin(
      experiencesTable,
      and(
        eq(idpResponseTable.email, experiencesTable.email),
        eq(experiencesTable.semester, idpResponseTable.semester),
      )
    )
    .leftJoin(
      usersTable,
      eq(idpResponseTable.email, usersTable.email),
    )
    .leftJoin(
      idpStatusTable,
      eq(idpResponseTable.semester, idpStatusTable.semester),
    )
    .leftJoin(
      idpProblemTable,
      eq(idpProblemTable.versionId, idpStatusTable.versionId),
    )
    .orderBy(desc(idpResponseTable.semester))
    .execute();
  return responses;
}