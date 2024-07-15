"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Section } from "@/types/type";
import IDPReportPreview from "./IDPReportPreview";
import TakeNotesDialog from "./TakeNotesDialog";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Class = {
  responseDisplayId: string,
  semester: string,
  updateTime: string,
  status: string,
  response: unknown,
  notes: string,
  school: string|null,
  username: string|null,
  versionId: number,
  data: Section[]
}
 
export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "semester",
    header: "學期",
  },
  {
    accessorKey: "username",
    header: "教師姓名",
  },
  {
    accessorKey: "updateTime",
    header: "更新時間",
    cell: ({row}) => (
      <>
        {row.original.status === 'a' ? '-' : row.original.updateTime}
      </>
    ),
  },
  {
    accessorKey: "status",
    header:"狀態",
    cell: ({row}) => (
      <>
        {row.original.status == 'a' ? "尚未填寫"
          :row.original.status == 'b' ? "暫存"
          :"已完成"
        }
      </>
    ),
  },
  {
    accessorKey: "view",
    header: "查看個人IDP",
    cell: ({row}) => (
      <IDPReportPreview row={row} />
    )
  },
]

export const principalColumns: ColumnDef<Class>[] = [
  {
    accessorKey: "notes",
    header: "校長筆記",
    cell: ({row}) => (
      <TakeNotesDialog row={row} />
    ),
  },
];
export const adminColumns: ColumnDef<Class>[] = [
  {
    accessorKey: "school",
    header: "學校/單位",
  },
];