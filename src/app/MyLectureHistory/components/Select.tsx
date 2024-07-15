"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type SelectionProps={
  selections:string[],
  onChange:(value:string)=>void,
}
export default function Selection({selections,onChange}:SelectionProps) {
  return (
    <Select defaultValue="all" onValueChange={onChange}>
      <SelectTrigger className="w-2/3">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">全</SelectItem>
          {selections.map((selection)=>(
            selection!==""&&<SelectItem value={selection} key={selection}>{selection}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
