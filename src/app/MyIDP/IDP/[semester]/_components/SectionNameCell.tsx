"use client";

import { useEditIdpProblem } from "@/app/hooks/EditIdpProblemContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil, Check } from "react-flaticons";

function SelectTypeAndEdit({sectionName,sectionIndex,widths}:{sectionName:string,sectionIndex:number,widths:string}) {
    const [editName,setEditName] = useState(false);
    const {preview, handleSectionName} = useEditIdpProblem();
    return(
        <div className="px-2 py-0.5 flex gap-2 h-7 items-center" style={{color: "white"}}>
            {!preview && <div className="rounded-full cursor-pointer hover:bg-neutral-200" onClick={()=>{setEditName(!editName)}}>
                {!editName && <Pencil size={11} color="#9c9c9c" />}
                {editName  && <Check size={11} color="#9c9c9c" />}
            </div>}
            {(preview || !editName) && <div style={{fontSize:"17px"}}>{sectionName}</div>}
            {(editName && !preview) && <Input
                placeholder={"段落標題"}
                onChange={(e)=>handleSectionName(e.target.value,sectionIndex)}
                value={sectionName}
                className="h-6"
            />}
            {!preview && <div style={{fontSize:"14px"}}>{widths}</div>}
        </div>
  );
}

export default SelectTypeAndEdit;