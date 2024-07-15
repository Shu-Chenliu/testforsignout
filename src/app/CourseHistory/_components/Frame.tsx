"use client";
import { BasicButton } from '@/app/_components/BasicButton';
import {useState} from 'react';
import BigCategoryBar from './BigCategoryBar';
import MiddleCategoryCard from './MiddleCategoryCard';
import CourseInfoDialog from './CourseInfoDialog';
type FrameProps={
  courseObj: {
    [bigCategory: string]: {
      [middleCategory: string]: {
        [smallCategory: string]: CourseInfo[]
      }
    }
  }
}
export type DialogInfo = {
  bigCategory:string,
  middleCategory:string,
  smallCategory:string,
  courseId:string,
  courseName:string,
  teachername:string,
  date:string,
  series:string,
  taken:boolean,
  feedback:string
}

export type CourseInfo = {
  courseId:string,
  courseName:string,
  teachername:string,
  date:string,
  series:string,
  taken:boolean,
  feedback:string
}

export default function Frame({courseObj}:FrameProps){
  const [bigCategoryI, setBigCategoryI] = useState(0);
  const [courseInfo, setCourseInfo] = useState<DialogInfo>({
    bigCategory:"",
    middleCategory:"",
    smallCategory:"",
    courseId:"",
    courseName:"",
    teachername:"",
    date:"",
    series:"",
    taken:false,
    feedback:""
  });
  const [dialogOpen,setDialogOpen] = useState(false);
  const bigCategories = Object.keys(courseObj);

  return(
    <div className='w-full'>
      <div className='flex justify-between'>
        <BigCategoryBar labels={bigCategories} setBigCategory={setBigCategoryI} />
        <BasicButton dark={false} text='查看修課紀錄報表' width='150px' href='/CourseHistory/ExportHistory' />
      </div>
      <div className='grid grid-cols-3 gap-5 py-3'>
        {Object.keys(courseObj[bigCategories[bigCategoryI]]).map((middleCategory,i)=>(
          <MiddleCategoryCard 
            key={i}
            bigI={bigCategoryI} 
            bigCategory={Object.keys(courseObj)[bigCategoryI]}
            middleI={i}
            middleCategory={middleCategory} 
            smallCategories={courseObj[bigCategories[bigCategoryI]][middleCategory]}
            setCourseInfo={setCourseInfo}
            setDialogOpen={setDialogOpen} />
        ))}
      </div>
      <CourseInfoDialog open={dialogOpen} setOpen={setDialogOpen} courseInfo={courseInfo} />
    </div>
  );
}