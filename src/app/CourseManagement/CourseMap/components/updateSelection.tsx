"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
// import { getData } from "./actions";
import { Class } from "./Columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ORANGE } from "@/lib/constants";
type Props={
  data: {
    id: string;
    bigCategory: string;
    middleCategory: string;
    smallCategory: string;
    course: {
      name: string;
      courseId: string;
    }[];
  }[],
};
export function UpdateSelection({data}:Props) {
  const [level, setLevel] = useState("firstLevel");
  // const [contentList, setContentList] = useState<string[]>(['']);
  // const data=getData("");
  // useEffect(()=>{
  //   const arr =data.map((category) => category[level as keyof Class]);
  //   if(level !== "thirdLevel") {
  //     setContentList(Array.from(new Set(arr)))
  //   }
  //   console.log(Array.from(new Set(arr)));
  // },[level])
  return (
    <div className="flex gap-2">
      <Select 
        onValueChange={setLevel}
        value={level}>
        <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="選擇分類" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
              <SelectLabel>要編輯的類別</SelectLabel>
              <SelectItem value="firstLevel">大分類</SelectItem>
              <SelectItem value="secondLevel">中分類</SelectItem>
              <SelectItem value="thirdLevel">小分類</SelectItem>
            </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="要編輯的內容" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>要編輯的內容</SelectLabel>
            {Array.from(new Set(data.map((category) => category[level as keyof Class]))).map((content)=>(
              <SelectItem key={content.toString()} value={content.toString()}>{content.toString()}</SelectItem>
            ))}
            </SelectGroup>
        </SelectContent>
      </Select>
      <Input className="w-[130px]" placeholder="replace with" />
      <Button className="rounded-full px-6" style={{backgroundColor:ORANGE}}>
        取代
      </Button>
  </div>
  )
}
