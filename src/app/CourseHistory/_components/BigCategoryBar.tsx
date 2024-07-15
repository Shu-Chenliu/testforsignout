"use client";
import { GREEN, ORANGE, PINK, TIFFANY } from '@/lib/constants';
import {Dispatch, SetStateAction} from 'react';
type Props={
  labels: string[],
  setBigCategory: Dispatch<SetStateAction<number>>
}
export default function BigCategoryBar({labels,setBigCategory}:Props){
  const bgColor = [GREEN,TIFFANY,ORANGE,PINK];
  return(
    <div className="flex gap-3">
      {labels.map((label,i)=>(
        <button 
          key={label}
          className="rounded-full py-1 px-4" 
          style={{backgroundColor:bgColor[i],color: "white"}}
          onClick={()=>{setBigCategory(i)}}>
            {label+" + "}
        </button>
      ))}
    </div>
  );
}