"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Class = {
  id: number;
  courseId: string;
  teacherEmail: string;
  course: {
    date: string;
    id: number;
    name: string;
    courseId: string;
    year: string;
    series: string;
    teachername: string;
    typeId: string;
    type: {
      bigCategory: string;
      middleCategory: string;
    };
  };
}
 
export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "course.teachername",
    header: "老師",
  },
  {
    accessorKey: "course.type.bigCategory",
    header: "課程類別",
  },
  {
    accessorKey: "course.type.middleCategory",
    header: "課程主題",
  },
  {
    accessorKey: "course.name",
    header: "課程名稱",
  },
  {
    accessorKey: "course.year",
    header: "課程時間",
  },
  {
    accessorKey: "course.series",
    header: "活動系列",
  },
]