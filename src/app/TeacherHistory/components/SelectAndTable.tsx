"use client";
import {useState} from 'react';
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import Selection from "./Select";
type ExportHistoryProps={
  years:string[],
  types:string[],
  series:string[],
  teachers:string[],
  topics:string[],
  course:string[],
  data: {
    student:string,
    type: string;
    topic: string;
    name: string;
    time: string;
    teacher: string;
    series: string;
  }[],
}
export default function SelectAndData({teachers,years,topics,types,series,course,data}:ExportHistoryProps){
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const handleTeacherChange=(value:string)=>{
    setSelectedTeacher(value);
  }
  const handleCourseChange=(value:string)=>{
    setSelectedCourse(value);
  }
  const handleTopicChange=(value:string)=>{
    setSelectedTopic(value);
  }
  // Handler function for year selection change
  const handleYearChange = (value:string) => {
    setSelectedYear(value);
  };

  // Handler function for topic selection change
  const handleTypeChange = (value:string) => {
    setSelectedType(value);
  };

  // Handler function for series selection change
  const handleSeriesChange = (value:string) => {
    setSelectedSeries(value);
  };

  const dataToShow=data.filter((d)=>(
    (d.time===selectedYear||selectedYear==="all")&&
    (d.type===selectedType||selectedType==="all")&&
    (d.series===selectedSeries||selectedSeries==="all")&&
    (d.student===selectedTeacher||selectedTeacher==="all")&&
    (d.name===selectedCourse||selectedCourse==="all")&&
    (d.topic===selectedTopic||selectedTopic==="all")
  ));
  return(
    <>
      <div className="flex justify-center gap-1">
        <div className="flex gap-1 items-center w-1/6">
          <p className="">修課教師</p>
          <Selection selections={teachers} onChange={handleTeacherChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/6">
          <p className="">課程類別</p>
          <Selection selections={types} onChange={handleTypeChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/6">
          <p className="">課程主題</p>
          <Selection selections={topics} onChange={handleTopicChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/6">
          <p className="">課程名稱</p>
          <Selection selections={course} onChange={handleCourseChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/6">
          <p className="">匯出區間</p>
          <Selection selections={years} onChange={handleYearChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/6">
          <p className="">活動系列</p>
          <Selection selections={series} onChange={handleSeriesChange}/>
        </div>
      </div>
      <div className="w-5/6 h-full justify-self-center mt-8">
        <DataTable columns={columns} data={dataToShow}/>
      </div>
    </>
  );
}