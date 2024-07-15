"use client";

import { BasicButton } from "@/app/_components/BasicButton";
import { useEditIdpProblem } from "@/app/hooks/EditIdpProblemContext";
// import { INDIGO } from "@/lib/constants";
// import { Upload } from "react-flaticons";
// import useIdpProblem from "@/app/hooks/useIdpProblem";
import { useState } from "react";
import SaveIdpDialog from "./SaveIdpDialog";
// import { INDIGO } from "@/lib/constants";
// import { Upload } from "react-flaticons";

function PreviewOrEditBtn({version,semester}:{version:number,semester:string}) {
  const { preview, handlePreview, exportData, handleUpload, setPreviewSimplifiedVersion } = useEditIdpProblem();
  const [saveIdpDialogOpen, setSaveIdpDialogOpen ] = useState(false);
  return(
    <div className="flex gap-2 pb-4 w-fit text-nowrap">
        {!preview && 
        <>
          <div 
            className="cursor-pointer justify-self-center flex items-center text-center rounded-full w-56 font-semibold text-sm hover:opacity-80 px-2">
              <input type="file" className="w-fit" onChange={(e)=>{handleUpload(e)}} />
          </div>
          <BasicButton text="下載 json file" dark={false} size={14} onClick={()=>{exportData()}} />
          <SaveIdpDialog version={version} semester={semester} open={saveIdpDialogOpen} setOpen={setSaveIdpDialogOpen} />
        </>}
        <BasicButton text={preview?"編輯":"預覽"} dark={false} size={14} onClick={()=>{handlePreview()}} />
        <BasicButton text="輕量版" dark={true} size={14} onClick={()=>{setPreviewSimplifiedVersion(true)}} />
        <BasicButton text="完整版" dark={true} size={14} onClick={()=>{setPreviewSimplifiedVersion(false)}} />
    </div>
  );
}

export default PreviewOrEditBtn;