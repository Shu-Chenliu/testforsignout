"use client"
import {Button} from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Class = {
  student:string,
  topic:string,
  type:string,
  name:string,
  time:string,
  teacher:string,
  series:string,
}
 
export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "student",
    header: "教師姓名",
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
    accessorKey: "time",
    header: "課程日期",
  },
  {
    accessorKey: "series",
    header: "活動系列",
  },
  {
    accessorKey: "record",
    header: "修課紀錄",
    cell: () => (
      <Button style={{backgroundColor:INDIGO}} className="rounded-full ml-2 h-6">
        {"查看"}
      </Button>
    ),
  },
  // TODO:分配欄寬
]