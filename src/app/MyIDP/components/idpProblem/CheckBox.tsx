"use client";

import { Cell } from "@/types/type";
import { useEffect, useState } from "react";

// interface ResponseType {
//   [key: string]: string[]; // Define the structure of your response object
// }

type Props = {
  cell: Cell,
  mode: string,
  response?: string,
  updateCellResponse?: (cellId: string, ans: string) => void
};

function CheckBox({cell,mode,response,updateCellResponse}:Props) {
  const options = cell.content ? JSON.parse(cell.content) : [];
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(options.length).fill(false));

  useEffect(() => {
    if (mode==="write" || mode==="preview") {
      setCheckedItems((response && response!=="{}")?JSON.parse(response):new Array(options.length).fill(false))
    }
  },[mode])

  const handleCheckboxChange = (index: number) => {
    const newChecked = [
      ...checkedItems.slice(0,index),
      !checkedItems[index],    
      ...checkedItems.slice(index+1), 
    ];
    setCheckedItems(newChecked);
    if (mode==="write" && updateCellResponse) {
      updateCellResponse(cell.id,JSON.stringify(newChecked));
    }
  };

  return(
    <div style={{fontSize:(mode==="preview") ? "14px" : cell.size}}>
      {options.length>0 && 
        options.map((option:string,index:number)=>(
          <div key={option.toString()} className="flex gap-1">
            <input type="checkbox" 
              checked={checkedItems[index]}
              onChange={() => handleCheckboxChange(index)}
              disabled={mode==="preview"} />
            <div>{option}</div>
          </div>
        ))}
    </div>
  );
}

export default CheckBox;