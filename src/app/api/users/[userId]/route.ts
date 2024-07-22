// import { NextRequest, NextResponse } from "next/server";

// import {  eq } from "drizzle-orm";

// import { db } from "@/db";
// import { usersTable } from "@/db/schema";

// export async function GET(
//   // eslint-disable-next-line
//   req: NextRequest,
//     {
//       params,
//     }: {
//       params: {
//         userId: number;
//       };
//     },) {
//     try {
//       const usersStatus = await db
//         .select({
//           id: usersTable.id,
//           authority: usersTable.authority,
//         })
//         .from(usersTable)
//         .where(
//             eq(usersTable.id, params.userId)
//         );
      
//       if (!usersStatus) {
//         return NextResponse.json({ error: `no idp status available` }, { status: 404 });
//       }
  
//       return NextResponse.json(
//         {
//           usersStatus: usersStatus,
//         },
//         { status: 200 },
//       );
//     } catch (error) {
//       return NextResponse.json(
//         {
//           error: "Internal Server Error",
//         },
//         {
//           status: 500,
//         },
//       );
//     }
//   }