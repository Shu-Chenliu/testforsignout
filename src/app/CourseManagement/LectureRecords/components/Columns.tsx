"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import {Dialog,DialogTrigger,DialogContent,DialogHeader} from "@/components/ui/dialog";
import Table from "@/app/_components/Table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Class = {
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
}
 
export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "courseId",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: "類別",
  },
  {
    accessorKey: "topic",
    header: "課程主題",
  },
  {
    accessorKey: "name",
    header: "課程名稱",
  },
  {
    accessorKey: "date",
    header:"課程日期"
  },
  {
    accessorKey: "year",
    header: "課程期間",
  },
  {
    accessorKey: "teachername",
    header: "授課講師",
  },
  {
    accessorKey: "series",
    header: "活動系列",
  },
  {
    accessorKey: "feedback",
    header: "課程回饋",
    cell: ({row}) => {
      const header = ["學校","教師姓名","教師心得","課堂建議","達到課程目標","幫助現場實踐"]
      const data = row.original.records.map((student)=>(
        [
          student.student.experiences[0].school,
          student.student.username,
          student.qualification1,
          student.qualification2,
          student.quantification1,
          student.quantification2
        ]
      ));
      return (
        <div className="flex">
          <Dialog>
            <DialogTrigger asChild>
              <Button style={{backgroundColor:INDIGO}} className="rounded-full ml-2 h-6">
                {"查看"}
              </Button>
            </DialogTrigger>
            <DialogContent className="grid shadow-2xl justify-items-center">
              <DialogHeader>
                <p className="font-bold">課程回饋</p>
              </DialogHeader>
              <Table header={header} data={data} />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  },
  {
    accessorKey: "students",
    header: "修課人次",
    cell: ({row}) => {
      const header = ["學校","教師姓名"]
      const data = row.original.records.map((record)=>(
        [ record.student.experiences[0].school,
          record.student.username ]
      ));
      return (
        <div className="flex">
          <p>{row.original.records.length}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button style={{backgroundColor:INDIGO}} className="rounded-full ml-2 h-6">
                {"查看"}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full shadow-2xl justify-items-center">
              <DialogHeader>
                <p className="font-bold">修課人次</p>
              </DialogHeader>
              <Table header={header} data={data} />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  },
]