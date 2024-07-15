"use client";

import {useEditIdpProblem} from "@/app/hooks/EditIdpProblemContext";
import { Cell } from "@/types/type";
import { Pencil } from "react-flaticons";
import { GrStarOutline } from "react-icons/gr";

function SelectTypeAndEdit({cellIndex,cell,sectionIndex}:{cellIndex:{i:number,j:number},cell:Cell, sectionIndex:number}) {
  const {selected,handleCheck,handleType,handleEdit} = useEditIdpProblem();
  const typeList = ["文字","自由填答","單選題","巢狀單選","巢狀多選","勾選題"];
  function handleRes(res:{ok:boolean,error:string}) {
    if (!res.ok) {
      alert(res.error);
    }
  }
  return(
    <div className="flex gap-1 items-center"> 
      <div className="w-3">{cell.simplifiedVersion && <GrStarOutline size={12} color={cell.color==="dark"?"white":"black"} />}</div>
      <input type="checkbox" checked={selected.includes(cell.id)} onChange={() => handleRes(handleCheck(cell.id,sectionIndex,""))} />
      <select style={{fontSize: "12px"}} value={cell.type} onChange={(e)=> handleRes(handleType(e.target.value,cell,sectionIndex)) }>
        {typeList.map((t,k) => (
          <option key={"type"+k} value={t}>{t}</option>
        ))}
      </select>
      <div className="rounded-full cursor-pointer hover:bg-neutral-200" onClick={()=>handleEdit(cellIndex,sectionIndex,false)}>
        <Pencil size={11} color="#9c9c9c" /> {/* 編輯icon */}
      </div>
      
    </div>
  );
}

export default SelectTypeAndEdit;