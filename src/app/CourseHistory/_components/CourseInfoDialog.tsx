"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LabelText from "./LabelText";
import { DialogInfo } from "./Frame";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseInfo: DialogInfo;
};

function CourseInfoDialog({open,setOpen,courseInfo}:Props) {
  const { courseName, teachername, date, series, bigCategory, middleCategory, smallCategory, taken, feedback } = courseInfo;
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">課程詳細資訊</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="flex flex-col">
            <LabelText label="課程名稱" text={courseName} />
            <LabelText label="授課講師" text={teachername} />
            <LabelText label="課程時間" text={date} />
            <LabelText label="活動系列" text={series} />
            <LabelText label="課程類別" text={`${bigCategory}-${middleCategory}-${smallCategory}`} />
            <LabelText label="課程回饋" text={taken ? feedback : "尚未修課"} />
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}

export default CourseInfoDialog;