"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import Link from "next/link";
import UploadCourseButton from "./UploadCourseButton";
import UploadCourseResultButton from "./UploadCourseResultButton";
import UploadCourseFeedback from "./UploadCourseFeedback";
type Props={
  time:string,
  button:string,
  destination:string
}
export default function LinkBox({time}: Props) {
  const picture=time==="前"?"/uploadCourse.png":time==="後"?"/uploadCourseMap.png":"/feedback.png";
  return (
    <div className="grid bg-slate-100 rounded-md justify-items-center w-[80%] p-2">
      <p>{time==="課程後"?time:"選課"+time}</p>
      <div className="relative object-contain w-[80%] h-44">
        <Image
          className="object-contain"
          src={picture}
          fill={true}
          alt={picture}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {time==="前"&&
        <>
          <Button
            style={{ backgroundColor:INDIGO}}
            className="rounded-full mb-2"
          >
            <Link href={`/CourseManagement/CourseMap`}>
              {"匯入課程地圖"}
            </Link>
          </Button>
          <UploadCourseButton/>
        </>
      }
      {time==="後"&&<UploadCourseResultButton/>}
      {time==="課程後"&&<UploadCourseFeedback/>}
    </div>
  )
}
