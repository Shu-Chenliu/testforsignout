import { db } from "@/db";
import { teacherToCourse } from "@/db/schema";
import { eq } from "drizzle-orm";
export const getTypes=()=>{
  return ["領導力","教學力","cc力"];
}
export const getTopics=()=>{
  return ["嚴謹教學","個人化學習"];
}
export const getSeries=()=>{
  return ["2023峰會","2024峰會"];
}
export const getYears=()=>{
  return ["112-2","112-1","111-1"];
}
export const getData=async(email:string)=>{
  "use server";
  const courses=await db.query.teacherToCourse.findMany({
    where: eq(teacherToCourse.teacherEmail,email),
    with:{
      course:{
        with:{
          type: {
            columns:{
              bigCategory:true,
              middleCategory:true,
            }
          }
        }
      }
    }
  });
  return courses;
}