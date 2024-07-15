"use client";
import {Label} from "@/components/ui/label";
import { INDIGO} from "@/lib/constants";
import { useState } from "react";
import * as XLSX from "xlsx-js-style";
import SuccessDialog from './SuccessDialog';
import FailDialog from './FailDialog';
import useRecord from "@/app/hooks/useRecord";
interface FeedbackData {
  課程ID: string;
  填寫者帳號: string;
  質化1: string;
  質化2: string;
  量化1:string;
  量化2:string;
}
export default function UploadCourseFeedback() {
  const [open,setOpen]=useState(false);
  const [openFail,setOpenFail]=useState(false);
  const { updateRecord } = useRecord();
  const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files![0]);
    reader.onload = async (e) => {
      const data = e.target!.result;
      const workbook = XLSX.read(data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const dataHeader = dataArr[0] as string[];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: dataHeader }) as FeedbackData[];
      const value2String = (value:undefined|number|string) => {
        return (value!==undefined ? value.toString() : value);
      }
      try {
        for (const d of parsedData.slice(1)) {
          await updateRecord({
            courseId: d.課程ID.toString(),
            studentEmail: d.填寫者帳號,
            qualification1: value2String(d.質化1),
            qualification2: value2String(d.質化2),
            quantification1: value2String(d.量化1),
            quantification2: value2String(d.量化2)
          });
        }
        setOpen(true);
      } catch (error) {
        console.error("Error adding feedback:", error);
        setOpenFail(true);
        return;
      }
    };
  }
  return (
    <>
    <SuccessDialog Open={open} onClose={()=>setOpen(false)} link={"/CourseManagement/LectureRecords"}/>
    <FailDialog Open={openFail} onClose={()=>setOpenFail(false)} link={"單堂課程回饋模板"}/>
      <Label className="grid rounded-full items-center justify-items-center px-4" style={{backgroundColor:INDIGO}}>
        <div className="text-white">
          匯入單堂課程回饋
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
