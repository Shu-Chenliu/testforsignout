'use client'
import { useEffect, useState } from "react";

import Toolbar from "./_components/Toolbar";
import PreviewOrEditBtn from "./_components/PreviewOrEditBtn";
import IDPTable from "./_components/IDPTable";
import { useEditIdpProblem } from "@/app/hooks/EditIdpProblemContext";
import IdpVersionSelect from "./_components/IdpVersionSelect";

export default function IDPEdit({ 
  params,
}: {
  params: { semester: string }
}){
  const [version,setVersion] = useState<number>(-1);
  const { initData, setSemester } = useEditIdpProblem();
  const semester = params.semester;

  useEffect(()=>{
    async function callInitData() {
      setSemester(semester);
      const version_ = await initData(semester);
      console.log("callInitData");
      console.log(version_);
      setVersion(version_);
    }
    if (semester) callInitData();
  },[semester])

  return(
    <div className="h-screen p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">IDP 題目編輯</p>
      </div>
      <div className="flex gap-3">
      </div>
      <div className="flex justify-between items-start h-fit w-full">
        <Toolbar />
        <PreviewOrEditBtn semester={semester} version={version} />
      </div>
      <div className="flex gap-3">
        <div>{"學期: "+semester}</div>
        {version!=-1 && <div>IDP版本: </div>}
        <IdpVersionSelect version={version} setVersion={setVersion} />
      </div>
      <IDPTable />
    </div>
  );
}