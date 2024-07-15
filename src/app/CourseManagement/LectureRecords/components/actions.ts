import { db } from "@/db";
export const getData=async()=>{
  "use server";
  const courses=await db.query.courseTable.findMany({
    columns:{
      id:true,
      year:true,
      series:true,
      name:true,
      courseId:true,
      teachername:true,
      date:true,
    },
    with:{
      type:{
        columns:{
          bigCategory:true,
          middleCategory:true,
        }
      },
      records:{
        columns:{
          qualification1:true,
          qualification2:true,
          quantification1:true,
          quantification2:true
        },
        with:{
          student:{
            columns:{
              username:true,
            },
            with:{
              experiences:{
                columns:{
                  school:true,
                  semester:true
                },
              }
            }
          }
        }
      },
    }
  })
  const filteredCourses = courses.map(entry => {
    const courseYear = entry.year;
    const newRecords = entry.records.map((record)=>{
      const filteredExperiences = record.student.experiences.filter(exp => exp.semester === courseYear);
      return {
        ...record,
        student: {
          ...record.student,
          experiences: filteredExperiences
        }
      };
    })
    return {
        ...entry,
        records: newRecords
    };
  });
  return filteredCourses;
  // return courses;
}