import { db } from "@/db";
export const getExperiences=async()=>{
  "use server";
  const experience= await db.query.experiencesTable.findMany({
    columns:{
      id:true,
      semester:true,
      school:true,
      position:true,
      subject:true,
      role:true,
      feature:true,
    },
    with:{
      user:{
        columns:{
          mobile:true,
          username:true,
          email:true,
          displayId:true,
          authority:true,
          disable:true,
        }
      }
    }
  });
  return experience;
}