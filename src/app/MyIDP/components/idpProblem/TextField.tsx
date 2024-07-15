"use client";

import { Cell } from "@/types/type";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  cell: Cell,
  mode: string,
  response?: string,
  updateCellResponse?: (cellId: string, ans: string) => void
};

function TextField({cell,mode,response,updateCellResponse}:Props) {
  const [ value, setValue ] = useState("");

  useEffect(() => {
    if (mode==="write" || mode==="preview") {
      setValue(response??"")
    }
  },[mode])

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (mode==="write" && updateCellResponse) {
      if (!e.target.value) return;
      updateCellResponse(cell.id,e.target.value);
    }
  };
  return(
    <div className="flex w-full">
      <Textarea 
        className="flex-grow py-1 px-1"
        style={{height:"16px",fontSize:(mode==="preview") ? "14px" : cell.size}} 
        placeholder={cell.content} 
        value={value} 
        onChange={handleChange}
        disabled={mode==="preview"} />
    </div>
  );
}

export default TextField;