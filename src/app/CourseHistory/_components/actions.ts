import { db } from "@/db"
import { courseRecordTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { CourseInfo } from "./Frame"

type CourseObj = {
  [bigCategory: string]: {
    [middleCategory: string]: {
      [smallCategory: string]: CourseInfo[]
    }
  }
}

// type Courses = {
//   bigCategory: string;
//   middleCategory: string;
//   smallCategory: string;
//   course: {
//       date: string;
//       name: string;
//       courseId: string;
//       series: string;
//       teachername: string;
//       records: {
//           qualification1: string | null;
//       }[];
//   }[];
// }[]

export const getData = async (email:string) => {
  "use server";
  const courses = await db.query.courseMapTable.findMany({
    columns:{
      bigCategory: true,
      middleCategory: true,
      smallCategory: true
    },
    with:{
      course:{
        columns:{
          courseId:true,
          name:true,
          teachername:true,
          date:true,
          series:true,
        },
        with:{
          records:{
            columns:{
              qualification1:true,
            },
            where:eq(courseRecordTable.studentEmail,email)
          }
        }
      }
    }
  })
  const courseObj:CourseObj = {};
  courses.forEach(course => {
    const { bigCategory, middleCategory, smallCategory } = course;
  
    if (!courseObj[bigCategory]) {
      courseObj[bigCategory] = {};
    }
    if (!courseObj[bigCategory][middleCategory]) {
      courseObj[bigCategory][middleCategory] = {};
    }
    if (!courseObj[bigCategory][middleCategory][smallCategory]) {
      courseObj[bigCategory][middleCategory][smallCategory] = [];
    }
  
    course.course.forEach(c => {
      const taken = c.records.length > 0;
      const courseData = {
        courseId: c.courseId,
        courseName: c.name,
        teachername: c.teachername,
        date: c.date,
        series: c.series,
        taken,
        feedback: taken ? c.records[0].qualification1??"" : ""
      };
  
      courseObj[bigCategory][middleCategory][smallCategory].push(courseData);
    });
  });
  return courseObj;
}