"use client";
import {useState} from 'react';
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import Selection from "./Select";
import ExportLectureButton from './ExportLectureButton';
type ExportHistoryProps={
  years:string[],
  types:string[],
  series:string[],
  courses:string[],
  data: {
    date: string;
    id: number;
    name: string;
    courseId: string;
    year: string;
    series: string;
    teachername: string | null;
    records: {
      qualification1: string | null;
      qualification2: string | null;
      quantification1: string | null;
      quantification2: string | null;
      student: {
        username: string;
        experiences:{
          school:string;
        }[],
      };
    }[];
    type: {
      bigCategory: string;
      middleCategory: string;
    };
  }[],
  username:string,
}
export default function SelectAndData({years,types,series,courses,data}:ExportHistoryProps){
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  // const [open,setOpen]=useState(true);
  // Handler function for year selection change
  const handleYearChange = (value:string) => {
    setSelectedYear(value);
  };
  const handleCourseChange=(value:string)=>{
    setSelectedCourse(value);
  }
  // Handler function for topic selection change
  const handleTypeChange = (value:string) => {
    setSelectedType(value);
  };

  // Handler function for series selection change
  const handleSeriesChange = (value:string) => {
    setSelectedSeries(value);
  };
  const dataToShow = data
    .map((d) => ({
      ...d,
      type: d.type.bigCategory,
      topic: d.type.middleCategory,
    }))
    .filter((d) => (
      (d.year === selectedYear || selectedYear === "all") &&
      (d.type === selectedType || selectedType === "all") &&
      (d.series === selectedSeries || selectedSeries === "all") &&
      (d.name === selectedCourse || selectedCourse === "all")
  ));
  return(
    <>
      {/* <SuccessDialog/> */}
      <div className="flex justify-center gap-1">
        <div className="flex gap-1 items-center w-1/5">
          <p className="">課程類別</p>
          <Selection selections={types} onChange={handleTypeChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">課程名稱</p>
          <Selection selections={courses} onChange={handleCourseChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">搜尋區間</p>
          <Selection selections={years} onChange={handleYearChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">活動系列</p>
          <Selection selections={series} onChange={handleSeriesChange}/>
        </div>
      </div>
      <div className="w-5/6 h-full justify-self-center mt-8">
        <DataTable columns={columns} data={dataToShow}/>
      </div>
      <div className="grid justify-items-center mt-5 ">
        <ExportLectureButton data={dataToShow} />
      </div>
    </>
  );
}