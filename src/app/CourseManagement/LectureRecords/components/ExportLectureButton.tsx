"use client";
import { Button } from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import * as XLSX from 'xlsx';
type Props={
  data:{
    id: number;
    name: string;
    courseId: string;
    year: string;
    series: string;
    teachername: string | null;
    type:string;
    topic: string;
    date:string;
    records:{
      qualification1: string | null;
      qualification2: string | null;
      quantification1: string | null;
      quantification2: string | null;
      student:{
        username:string;
        experiences:{
          school:string;
        }[],
      }
    }[]
  }[]
}
export default function ExportLectureButton({data}:Props) {
  const handleExportExcel = () => {
    const header = ["課程ID","類別","課程主題","課程名稱","課程日期","課程期間","授課講師","活動系列"];
    const content = data.map((row)=>(
      [row.courseId,row.type,row.topic,row.name,row.date,row.year,row.teachername,row.series]
    ))
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([header,...content]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, '課程清單.xlsx');
  }
  
  return (
    <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}} onClick={handleExportExcel}>
      {"匯出"}
    </Button>
  )
}
