import { db } from "@/db";

export const getData=async()=>{
  "use server";
  const courses=await db.query.courseMapTable.findMany({
    columns:{
      id:true,
      bigCategory:true,
      middleCategory:true,
      smallCategory:true,
    },
    with:{
      course:{
        columns:{
          courseId:true,
          name:true,
        }
      }
    }
  })
  return courses;
}