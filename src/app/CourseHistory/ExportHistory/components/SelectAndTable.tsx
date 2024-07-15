"use client";
import { useState } from 'react';
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import Selection from "./Select";
import { ADMIN, TEACHER } from '@/lib/constants';
import ExportCourseHistoryButton from './ExportCourseHistoryButton';

type ExportHistoryProps = {
  authority: string,
  years: string[],
  name: string[],
  bigCategory: string[],
  middleCategory: string[],
  courses: string[],
  school: string[],
  series: string[],
  data: {
    id: number;
    studentEmail: string;
    courseId: string;
    qualification1: string | null;
    qualification2: string | null;
    quantification1: string | null;
    quantification2: string | null;
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
  }[],
}

export default function SelectAndData({ authority, years, name, bigCategory, middleCategory, school, series, data }: ExportHistoryProps) {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedName, setSelectedName] = useState("all");
  // const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedSeries, setSelectedSeries] = useState("all");

  // Handler functions for selection changes
  const handleYearChange = (value: string) => setSelectedYear(value);
  const handleTypeChange = (value: string) => setSelectedType(value);
  const handleTopicChange = (value: string) => setSelectedTopic(value);
  const handleSeriesChange = (value: string) => setSelectedSeries(value);
  const handleNameChange = (value: string) => setSelectedName(value);
  const handleSchoolChange = (value: string) => setSelectedSchool(value);

  const dataToShow = data
    .map((d) => {
      return {
        ...d,
        school: d.student.experiences[0].school,
      };
    })
    .filter((d) => (
      (d.course.year === selectedYear || selectedYear === "all") &&
      (d.course.type.bigCategory === selectedType || selectedType === "all") &&
      (d.course.type.middleCategory === selectedTopic || selectedTopic === "all") &&
      (d.course.series === selectedSeries || selectedSeries === "all") &&
      (d.student.username === selectedName || selectedName === "all") &&
      // (d.course.name === selectedCourse || selectedCourse === "all") &&
      (d.school === selectedSchool || selectedSchool === "all")
    ));

  return (
    <>
      <div className="grid grid-flow-col justify-stretch gap-3">
        {authority===ADMIN && <div className="flex gap-1 items-center">
          <p className="">KIST學校</p>
          <Selection selections={school} onChange={handleSchoolChange} />
        </div>}
        {authority!==TEACHER && <div className="flex gap-1 items-center">
          <p className="">姓名</p>
          <Selection selections={name} onChange={handleNameChange} />
        </div>}
        <div className="flex gap-1 items-center">
          <p className="">類別</p>
          <Selection selections={bigCategory} onChange={handleTypeChange} />
        </div>
        <div className="flex gap-1 items-center">
          <p className="">課程主題</p>
          <Selection selections={middleCategory} onChange={handleTopicChange} />
        </div>
        <div className="flex gap-1 items-center">
          <p className="">課程時間</p>
          <Selection selections={years} onChange={handleYearChange} />
        </div>
        <div className="flex gap-1 items-center">
          <p className="">活動系列</p>
          <Selection selections={series} onChange={handleSeriesChange} />
        </div>
      </div>
      <div className="w-5/6 h-full justify-self-center mt-8">
        <DataTable columns={columns} data={dataToShow} />
      </div>
      <div className="grid justify-items-center mt-5 ">
        <ExportCourseHistoryButton data={dataToShow} />
      </div>
    </>
  );
}