"use client";

// import {useEditIdpProblem} from "@/app/hooks/EditIdpProblemContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useIdpProblem from "@/app/hooks/useIdpProblem";
import { useEffect, useState } from "react";
import { BasicButton } from "@/app/_components/BasicButton";
import { useEditIdpProblem } from "@/app/hooks/EditIdpProblemContext";

type Props = {
  version: number;
  setVersion: React.Dispatch<React.SetStateAction<number>>;
};

function IdpVersionSelect({version,setVersion}:Props) {
  const { getIdpVersions, postNewIdpVersion, getIdpProblem } = useIdpProblem();
  const { setData } = useEditIdpProblem();

  const [versions,setVersions] = useState([]);

  useEffect(()=>{
    async function getVersions() {
      const versions_ = await getIdpVersions();
      setVersions(versions_);
    }
    getVersions();
  },[version])

  const handleClickNewVersion = () => {
    async function postNewVersion() {
      const postedId = await postNewIdpVersion({
        data: []
      });
      setVersion(postedId);
      setData([]);
    }
    postNewVersion();
  }

  const handleChangeVersion = (versionId: number) => {
    async function updateData() {
      const data_ = await getIdpProblem(versionId);
      setData(data_);
    }
    updateData();
    setVersion(versionId);
  }
//  onChange={(e)=> handleRes(handleType(e.target.value,cell,sectionIndex))
  return(
    <>  
      {versions.length > 0 && version > 0 && <Select onValueChange={(e)=>{handleChangeVersion(parseInt(e))}}>
        {/* <SelectTrigger className="max-w-max h-min py-1 min-w-full"> */}
        {/* <SelectTrigger className="h-min py-1" style={{width: preview?"16rem":"10rem"}}> */}
        <SelectTrigger className="h-min py-0.5 w-16">
          <SelectValue placeholder={version} />
        </SelectTrigger>
        <SelectContent className="break-all w-32">
          {versions.map((versionJ:{versionId:number},i)=>(
            <>
              {versionJ.versionId && <SelectItem key={"option"+i} value={versionJ.versionId.toString()}>{versionJ.versionId}</SelectItem>}
            </>
          ))}
        </SelectContent>
      </Select>}
      <BasicButton text="新版本" onClick={()=>{handleClickNewVersion()}} />
    </>
  );
}

export default IdpVersionSelect;