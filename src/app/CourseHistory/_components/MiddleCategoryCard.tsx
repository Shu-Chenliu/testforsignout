"use client";
import { GREEN, LIGHT_GREY, ORANGE, PINK, TIFFANY } from '@/lib/constants';
import {Dispatch, SetStateAction} from 'react';
import SmallCategoryAccordion from './SmallCategoryAccordion';
import Image from "next/image";
import { CourseInfo, DialogInfo } from './Frame';
type Props={
  smallCategories: {
    [smallCategory: string]: CourseInfo[]
  },
  middleCategory: string,
  middleI: number,
  bigI: number,
  bigCategory: string,
  setCourseInfo: Dispatch<SetStateAction<DialogInfo>>,
  setDialogOpen: Dispatch<SetStateAction<boolean>>,
}
export default function MiddleCategoryCard({smallCategories,middleCategory,middleI,bigI,bigCategory,setCourseInfo,setDialogOpen}:Props){
  const bgColor = [GREEN,TIFFANY,ORANGE,PINK];
  return(
    <div className='rounded-3xl flex flex-col p-3 items-center' style={{backgroundColor:LIGHT_GREY}}>
      <Image
        className="object-contain"
        src={`/${bigI}/${middleI}.png`}
        alt="alt"
        width={220}
        height={100}
      />
      <a className='font-bold text-xl text-center w-full' style={{color:bgColor[bigI]}}>{middleCategory}</a>
      {
        Object.keys(smallCategories).map((smallCategory,s_)=>(
          <SmallCategoryAccordion key={s_} bigI={bigI} middleCategory={middleCategory} bigCategory={bigCategory} setCourseInfo={setCourseInfo} setDialogOpen={setDialogOpen} courses={smallCategories[smallCategory]} smallCategory={smallCategory} />
        ))
      }
    </div>
  );
}