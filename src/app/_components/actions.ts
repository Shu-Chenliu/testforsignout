import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
export const getUserByEmail = async(email:string) =>{
  "use server";
  const user= await db.query.usersTable.findFirst({
    columns:{
      mobile:true,
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
export const getUserByMobile = async(mobile:string) =>{
  "use server";
  const user= await db.query.usersTable.findFirst({
    columns:{
      email:true,
    },
    where:eq(usersTable.mobile,mobile),
  })
  if(!user){
    return null;
  }
  return user;
}