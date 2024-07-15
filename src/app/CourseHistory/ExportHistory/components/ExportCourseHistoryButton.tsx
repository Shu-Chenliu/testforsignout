"use client";
import { Button } from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import * as XLSX from 'xlsx';
type Props={
  data:{
    id: number;
    studentEmail: string;
    courseId: string;
    qualification1: string | null;
    qualification2: string | null;
    quantification1: string | null;
    quantification2: string | null;
    school: string;
    course: {
      date: string;
      name: string;
      year: string;
      series: string;
      teachername: string;
      type: {
        bigCategory: string;
        middleCategory: string;
      };
    };
    student: {
      username: string;
      experiences: {school:string,semester:string}[];
    };
  }[]
}
export default function ExportCourseHistoryButton({data}:Props) {
  const handleExportExcel = () => {
    const header = ["學校/單位","教師姓名","類別","課程主題","課程名稱","課程日期","課程期間","課程講師","活動系列"];
    const content = data.map((row)=>(
      [row.school,row.student.username,row.course.type.bigCategory,row.course.type.middleCategory,row.course.name,row.course.date,row.course.year,row.course.teachername,row.course.series]
    ))
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([header,...content]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, '修課紀錄.xlsx');
  }
  
  return (
    <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}} onClick={handleExportExcel}>
      {"匯出"}
    </Button>
  )
}
