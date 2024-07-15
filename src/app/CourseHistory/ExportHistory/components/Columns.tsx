"use client"
import { INDIGO } from "@/lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import {Dialog,DialogTrigger,DialogContent} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Table from "@/app/_components/Table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Class = {
  school: string;
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
    experiences:  {school:string,semester:string}[];
  };
}
 
export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "school",
    header: "學校／單位",
  },
  {
    accessorKey: "student.username",
    header: "教師姓名",
  },
  {
    accessorKey: "course.type.bigCategory",
    header: "類別",
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
    accessorKey: "course.date",
    header: "課程日期",
  },
  {
    accessorKey: "course.year",
    header: "課程期間",
  },
  {
    accessorKey: "course.teachername",
    header: "授課講師",
  },
  {
    accessorKey: "course.series",
    header: "活動系列",
  },
  {
    header:"課程回饋",
    cell: ({row}) => {
      const {school,qualification1,qualification2,quantification1,quantification2} = row.original;
      const header = ["學校","教師姓名","教師心得","課堂建議","達到課程目標","幫助現場實踐"]
      const data = [[
        school,
        row.original.student.username,
        qualification1,
        qualification2,
        quantification1,
        quantification2
      ]]
      return (
        <div className="flex">
          <Dialog>
            <DialogTrigger asChild>
              <Button style={{backgroundColor:INDIGO}} className="rounded-full ml-2 h-6">
                {"查看"}
              </Button>
            </DialogTrigger>
            <DialogContent className="grid shadow-2xl justify-items-center">
              {/* <div className="w-4/5 overflow-auto"> */}
              <Table data={data} header={header} />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  },
]