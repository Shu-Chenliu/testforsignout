import { db } from "@/db";
export const getData=async()=>{
  "use server";
  const courses=await db.query.courseRecordTable.findMany({
    with:{
      student:{
        columns:{
          username:true,
        },
        with:{
          experiences:{
            columns:{
              semester:true,
              school:true,
            },
          }
        }
      },
      course:{
        columns:{
          name:true,
          date:true,
          year:true,
          teachername:true,
          series:true,
        },
        with:{
          type:{
            columns:{
              bigCategory:true,
              middleCategory:true,
            }
          },
        }
      }
    }
  })
  const sortedCourses = courses.sort((a, b) => b.course.year.localeCompare(a.course.year));
  const filteredCourses = sortedCourses.map(entry => {
    const courseYear = entry.course.year;
    const filteredExperiences = entry.student.experiences.filter(exp => exp.semester === courseYear);
    return {
        ...entry,
        student: {
            ...entry.student,
            experiences: filteredExperiences
        }
    };
  });
  return filteredCourses;
}