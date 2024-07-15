"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ORANGE } from "@/lib/constants";
import { ManageIDPProps, MyIDPProps} from "./dataType";
// useRouter
import { IDPTableEditButton } from "./IDPTableEditButton";
import { IDPTablePublishButton } from "./IDPTablePublishButton";
import { IDPTableWriteIdpButton } from "./IDPTableWriteIdpButton";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<MyIDPProps>[] = [
  {
    accessorKey: "semester",
    header: "學期",
  },
  {
    // accessorKey: "updateTime",
    header: "更新時間",
    cell: ({ row }) => (
      <>
      {row.original.status == 'a' ? "-":row.original.updateTime}
      </>
    )
  },
  {
    header: "狀態",
    cell: ({ row }) => (
      <>
      {row.original.status == 'a' ? "尚未填寫":row.original.status == 'b' ? "暫存" : "已完成"}
      </>
    )
  },
  // {
  //   accessorKey: "comment",
  //   header: "他評(optional)",
  //   cell: ({ row }) => {
  //     const [open,setOpen]=useState(false);
  //     return(
  //       <>
  //         <Dialog>
  //           <DialogTrigger asChild>
  //             <Button style={{backgroundColor:INDIGO}} className="rounded-full h-6">
  //               {"查看"}
  //             </Button>
  //           </DialogTrigger>
  //           <DialogContent className="w-1/3 grid">
  //             <DialogHeader>
  //               <DialogTitle>他評</DialogTitle>
  //               <DialogDescription>
  //                 他人評論
  //               </DialogDescription>
  //             </DialogHeader>
  //             <div className="flex items-center space-x-2 mt-2 mb-2">
  //               {row.getValue("comment")}
  //             </div>
  //             <DialogFooter className="grid justify-items-end self-end">
  //               <DialogClose asChild>
  //                 <Button variant="secondary">
  //                   Close
  //                 </Button>
  //               </DialogClose>
  //             </DialogFooter>
  //           </DialogContent>
  //         </Dialog>
  //       </>
  //     );
  //   },
  // },
  {
    header: "操作",
    cell: ({ row }) => (
      <IDPTableWriteIdpButton row={row} />
    ),
  },
]

export const manageColumns: ColumnDef<ManageIDPProps>[] = [
  {
    accessorKey: "semester",
    header: "學期",
  },
  // {
  //   accessorKey: "updateTime",
  //   header: "更新時間",
  // },
  {
    // accessorKey: "operation",
    header: "操作",
    cell: ({ row }) => (
      <>
        <IDPTableEditButton row={row}/>
        <IDPTablePublishButton row={row}/>
        {/* <IDPNewVersionButton row={row}/> */}
        <Button style={{backgroundColor:ORANGE}} 
          className="rounded-full ml-2 h-6"
          disabled={true}
        >
          結案
        </Button>
      </>
    ),
  },
  {
    header: "已送出/總發佈",
    cell: ({ row }) => (
      <>
      {row.original.released ? row.original.note:"未發佈"}
      </>
    )
  },
  {
    header: "版本",
    cell: ({ row }) => (
      <>
      {row.original.versionId.toString()}
      </>
    ),
  },
]