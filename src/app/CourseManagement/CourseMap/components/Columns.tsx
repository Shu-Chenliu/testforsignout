"use client"
import { ColumnDef } from "@tanstack/react-table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Class = {
  id: string;
  bigCategory: string;
  middleCategory: string;
  smallCategory: string;
  course: {
    name: string;
    courseId: string;
  }[];
}

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "bigCategory",
    header: "大分類",
  },
  {
    accessorKey: "middleCategory",
    header: "中分類",
  },
  {
    accessorKey: "smallCategory",
    header: "小分類",
  },
  {
    accessorKey: "course",
    header: "開設課程",
    cell: ({ row }) => {
      return(
        <>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="h-6">{"展開 ("+row.original.course.length+")"}</AccordionTrigger>
              <AccordionContent>
                {row.original.course.map((course)=>(
                  <div key={course.name} className="py-1">{course.name}</div>)
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      );
    },
  },
]