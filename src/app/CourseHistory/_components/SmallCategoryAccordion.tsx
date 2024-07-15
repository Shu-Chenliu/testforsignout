"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Dispatch, SetStateAction } from "react";
import { GREEN, ORANGE, PINK, TIFFANY } from '@/lib/constants';
import { CourseInfo, DialogInfo } from "./Frame";
type Props={
  courses: CourseInfo[],
  bigCategory: string,
  middleCategory: string,
  smallCategory: string,
  setCourseInfo: Dispatch<SetStateAction<DialogInfo>>,
  bigI: number,
  setDialogOpen: Dispatch<SetStateAction<boolean>>,
}
export default function SmallCategoryAccordion({courses,smallCategory,middleCategory,bigCategory,setCourseInfo,setDialogOpen,bigI}:Props){
  const bgColor = [GREEN,TIFFANY,ORANGE,PINK];
  const takenCount = courses.filter(course => course.taken).length;
  return(
    <div className="rounded-xl px-3 border my-2 w-5/6" style={{borderColor:"lightGrey"}}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="h-6 text-base">{`${smallCategory} (${takenCount}/${courses.length})`}</AccordionTrigger>
          <AccordionContent>
            <div className="grid auto-cols-auto gap-1">
              {
                courses.map((course:CourseInfo,i_)=>(
                  <button 
                    key={i_}
                    className="px-3 rounded-xl w-fit"
                    style={{
                      backgroundColor:bgColor[bigI],
                      opacity: course.taken ? 0.9 : 0.5
                    }}
                    onClick={()=>{
                      const {courseId,courseName,teachername,date,series,taken,feedback} = course;
                      setCourseInfo({ bigCategory,middleCategory,smallCategory,courseId,courseName,teachername,date,series,taken,feedback });
                      setDialogOpen(true);
                    }} >
                    {course.courseName}
                  </button>
                ))
              }
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}