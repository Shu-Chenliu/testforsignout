"use client"
import { useEffect, useRef, useState } from "react";
import IDPResponseTable from "../components/IDPResponseTable";
import { useWriteIdp } from "@/app/hooks/WriteIdpContext";
import { GridLoader } from "react-spinners"
import { GREEN, INDIGO } from "@/lib/constants";
import SaveWriteIdpDialog from "../components/SaveWriteIdpDialog";
import SubmitIdpDialog from "../components/SubmitIdpDialog";
import { BasicButton } from "@/app/_components/BasicButton";
export default function IDPPage({ 
  params,
}: {
  params: { responseId: string }
}){
  const responseId = params.responseId;
  const { initResponseAndData, data, loading, response, updateCellResponse } = useWriteIdp();

  const { semester, status } = useWriteIdp();
  const [ openWriteIdpDialog, setOpenWriteIdpDialog ] = useState(false);
  const [ openSubmitIdpDialog, setOpenSubmitIdpDialog ] = useState(false);
  const [ simplifiedVersion, setSimplifiedVersion ] = useState(true);

  useEffect(()=>{  
    if (responseId)
      initResponseAndData(responseId);
  },[responseId])
  const sectionRefs = useRef<(HTMLDivElement|null)[]>([]);
  const scrollToSection = (index:number) => {
    const offsetPosition = sectionRefs.current[index]!.offsetTop - 200;
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]!.scrollIntoView({ behavior: 'smooth' });
    }
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  return(
    <div className="relative flex h-full py-14 px-16 items-center flex-col justify-center w-full">
      <div className="z-40 w-full fixed top-14 left-16" style={{backgroundColor:"white"}}>
        <div className="mb-2 mt-6 h-8 inline-flex items-center text-sm font-medium font-semibold gap-1 text-gray-700">
          <a>{"> "}</a>
          <a href="/MyIDP" className="hover:opacity-80 cursor-pointer">{"我的IDP"}</a>
          <a>{" > "}</a>
          <a>{semester}</a>
        </div>
        {(!loading && data.length > 0) && status!=="c" && 
          <div className="flex space-x-4 w-11/12 pb-2 justify-between" style={{backgroundColor:"white"}}>
            <>
              {data.map((section, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className="py-2 px-4 rounded flex flex-col items-center justify-center gap-1"
                >
                  <div className="w-8 h-8 rounded-full font-center flex items-center justify-center" style={{backgroundColor:GREEN, color:"white"}}>{index}</div>
                  <div className="font-bold" style={{color:INDIGO}}>{section.sectionName}</div>
                </button>
              ))}
            </>
            <div className="flex gap-2 w-fit text-nowrap pt-8 pr-6">
              <BasicButton text="輕量版" dark={true} height="25px" size={16} onClick={()=>{setSimplifiedVersion(true)}} />
              <BasicButton text="完整版" dark={true} height="25px" size={16} onClick={()=>{setSimplifiedVersion(false)}} />
            </div>
          </div>}
      </div>
      {(loading || data.length < 1) ? <GridLoader className="flex justify-center items-center py-64" size={8} color={INDIGO} />
      : <div className={status!=="c" ? "pt-36 w-full" : "pt-20 w-full" }>
          <IDPResponseTable mode={status!=="c"?"write":"preview"} simplifiedVersion={simplifiedVersion} sectionRefs={sectionRefs} data={data} response={response} updateCellResponse={updateCellResponse} />
          {status!=="c" && 
            <>
            <SubmitIdpDialog open={openSubmitIdpDialog} setOpen={setOpenSubmitIdpDialog} simplifiedVersion={simplifiedVersion} />
              <div className="fixed bottom-8 right-8">
                <SaveWriteIdpDialog open={openWriteIdpDialog} setOpen={setOpenWriteIdpDialog} />
              </div>
            </>
          }
        </div>
        }
      {/* <div>{JSON.stringify(response)}</div> */}
    </div>
  );
}