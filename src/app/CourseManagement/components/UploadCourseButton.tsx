"use client";
import {useState} from 'react';
import {Label} from "@/components/ui/label";
import { INDIGO} from "@/lib/constants";
import * as XLSX from "xlsx-js-style";
import useCourse from "@/app/hooks/useCourse";
import useTeacher from '@/app/hooks/useTeacher';
import SuccessDialog from './SuccessDialog';
import FailDialog from './FailDialog';
interface CourseData {
  課程期間:string;
  課程地圖ID:string;
  課程名稱:string;
  課程日期:string;
  授課教師:string;
  授課教師帳號:string;
  活動系列:string;
  課程ID:string;
}
export default function UploadCourseButton() {
  const [open,setOpen]=useState(false);
  const [openFail,setOpenFail]=useState(false);
  const {postCourse}=useCourse();
  const {postTeacher}=useTeacher();
  const addCourse=async(year:string,typeId:string,name:string,teachername:string,courseId:string,series:string,date:string)=>{
    await postCourse({
      year,
      series,
      courseId,
      name,
      teachername,
      typeId,
      date,
    });
  }
  const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files![0]);
    reader.onload = async(e) => {
      const data = e.target!.result;
      const workbook = XLSX.read(data, { type: "buffer" ,cellDates: true});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const dataHeader = dataArr[0] as string[];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: dataHeader }) as CourseData[];
      try {
        for (const d of parsedData.slice(1)) {
          const date=new Date(d.課程日期);
          const year=date.getFullYear().toString();
          const month=(date.getMonth()+1).toString();
          const day=date.getDate().toString();
          const dateStr=year+"/"+month+"/"+day;
          const teachers = d.授課教師帳號 ? d.授課教師帳號.split("、").filter(Boolean) : [];
          await addCourse(
            d.課程期間,
            d.課程地圖ID.toString(),
            d.課程名稱,
            d.授課教師,
            d.課程ID.toString(),
            d.活動系列,
            dateStr,
          );
          for(const teacher of teachers) {
            await postTeacher({
              teacherEmail: teacher,
              courseId:d.課程ID.toString(),
            })
          }
        }
        setOpen(true);
      } catch (error) {
        console.error("Error adding course:", error);
        setOpenFail(true);
        return;
      }
    };
  }
  // const test=()=>{
  //   setOpenFail(true);
  //   console.log(open);
  // }
  return (
    <> 
      {/* <Button onClick={test}>test</Button> */}
      <SuccessDialog Open={open} onClose={()=>setOpen(false)} link={'CourseManagement/LectureRecords'}/>
      <FailDialog Open={openFail} onClose={()=>setOpenFail(false)} link={"建立課程清單模板"}/>
      <Label className="grid rounded-full items-center justify-items-center px-4 py-3" style={{backgroundColor:INDIGO}}>
        <div className="text-white">
          匯入課程清單
        </div> 
        {/* TODO: show selected files */}
        <div style={{ display: 'none', }}>
          <input 
            type="file"
            onChange={handleUpload}
          />
        </div>
      </Label>
    </>
  )
}
