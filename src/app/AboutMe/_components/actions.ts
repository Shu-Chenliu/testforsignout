import { db } from "@/db";
import { experiencesTable, usersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
export const getUserByEmail = async(email:string) =>{
  "use server";
  const user= await db.query.usersTable.findFirst({
    columns:{
      mobile:true,
      // experience:true,
      imageURL:true,
      username:true,
      email:true,
      authority:true,
      displayId:true,
      hashedPassword:true,
    },
    where:eq(usersTable.email,email),
  })
  if(!user){
    return null;
  }
  return user;
}
export const getUserExperience=async(email:string)=>{
  "use server";
  // const experience = await db.query.experiencesTable.findMany({
  //   where:eq(experiencesTable.email,email),
  // })
  const [experience]= await db.query.experiencesTable.findMany({
    columns:{
      semester:true,
      school:true,
      position:true,
      subject:true,
      role:true,
      feature:true,
    },
    // with:{
    //   user:{
    //     columns:{
    //       mobile:true,
    //       imageURL:true,
    //       username:true,
    //       email:true,
    //       authority:true,
    //       displayId:true,
    //       hashedPassword:true,
    //     }
    //   }
    // },
    where:eq(experiencesTable.email,email),
    orderBy: [desc(experiencesTable.email)],
    limit: 1
  })
  return experience;
}