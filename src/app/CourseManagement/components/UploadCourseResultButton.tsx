"use client";
import {useState} from 'react';
import {Label} from "@/components/ui/label";
import { INDIGO} from "@/lib/constants";
import * as XLSX from "xlsx-js-style";
// import useStudent from "@/app/hooks/useStudent";
import useRecord from '@/app/hooks/useRecord';
import SuccessDialog from './SuccessDialog';
import FailDialog from './FailDialog';
interface CourseSelectionData {
  電子信箱:string;
  [key: string]: string;
}
export default function UploadCourseResultButton() {
  const [open,setOpen]=useState(false);
  const [openFail,setOpenFail]=useState(false);
  const {postRecord}=useRecord();
  const addCourseResult=async(email:string,courseIds:string[])=>{
    for (const courseId of courseIds){
      await postRecord({
        studentEmail:email,
        courseId:courseId,
      })
    };
  }
  const extractCourseCode = (course: string): string => {
    if (!course) return '';
    const index0 = course.toString().indexOf('【');
    const index1 = course.toString().indexOf('】');
    console.log(course.slice(index0+1, index1))
    return index0 === -1 ? "" : course.slice(index0+1, index1); // If "【" doesn't exist, return the entire string, otherwise return the part before "【"
  };
  const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files![0]);
    reader.onload = async(e) => {
      const data = e.target!.result;
      const workbook = XLSX.read(data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const dataHeader = dataArr[0] as string[];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: dataHeader }) as CourseSelectionData[];
      try{
        for (const d of parsedData.slice(1)) {
          if (d.電子信箱) {
            const courses = dataHeader
              .filter(header => (header.startsWith("【必修" || "【選修")))
              .map(header => extractCourseCode(d[header]))
              .filter(course => course);
            await addCourseResult(d.電子信箱, courses);
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
  return (
    <>
      <SuccessDialog Open={open} onClose={()=>setOpen(false)} link={'CourseHistory/ExportHistory'}/>
      <FailDialog Open={openFail} onClose={()=>setOpenFail(false)} link={"教師選課結果模板"}/>
      <Label className="grid rounded-full items-center justify-items-center px-4" style={{backgroundColor:INDIGO}}>
        <div className="text-white">
          匯入教師選課結果
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
