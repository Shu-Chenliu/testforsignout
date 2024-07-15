"use client";

import { INDIGO, LIGHT_GREY } from "@/lib/constants";
import Text from "@/app/MyIDP/components/idpProblem/Text";
import SingleSelect from "@/app/MyIDP/components/idpProblem/SingleSelect";
import CheckBox from "@/app/MyIDP/components/idpProblem/CheckBox";
import TextField from "@/app/MyIDP/components/idpProblem/TextField";

import { MutableRefObject } from "react";
import { Section } from "@/types/type";
import { ResponseType } from "@/types/type";
import ViewMore from "../IDP/[semester]/_components/ViewMore";
import NestedSelect from "./idpProblem/NestedSelect";

type ResponseTableProps = {
  mode: string,
  simplifiedVersion: boolean,
  sectionRefs?: MutableRefObject<(HTMLDivElement | null)[]>,
  data: Section[],
  response: ResponseType,
  updateCellResponse?: (cellId: string, ans: string) => void
};

function IDPResponseTable({mode,simplifiedVersion,sectionRefs,data,response,updateCellResponse}:ResponseTableProps) {
  return(
    <div className="w-full">
      {data.length > 0 && data.map((section, sectionIndex) => (
        <>
          {mode==="write" && sectionRefs && <div className="pt-4" 
            key={sectionIndex}
            ref={(el) => (sectionRefs.current[sectionIndex] = el)}
          ></div>}
          {section.sectionData.length > 0 && 
            <table className="w-full">
              <tbody>
                <tr>
                  <td 
                    style={{
                      border: "2px solid white",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                      backgroundColor: INDIGO,
                      fontSize:(mode==="preview") ? "16px" : "18px",
                    }}
                    colSpan={section.width.length}>
                    <div className="px-2 py-0.5 flex gap-1 items-center">
                      <div style={{color: "white"}}>{section.sectionName}</div>
                    </div>
                  </td>
                </tr>
                {section.sectionData.map((row,i) => (
                  <tr key={"sectionData-map-"+i}>
                    {row.map((cell,j) => (
                      <>  
                        {cell.type!=="null" && (cell.simplifiedVersion || (!cell.simplifiedVersion&&!simplifiedVersion)) && <td key={"cell"+j} 
                          className="px-2 py-1" 
                          style={{
                            border: "2px solid white",
                            backgroundColor: cell.color==="dark"?INDIGO:LIGHT_GREY,
                            width: (section.width[j]).toString()+"%",
                            color: cell.color==="dark"?"white":"black"
                          }}
                          colSpan={parseInt(cell.colSpan)} 
                          rowSpan={parseInt(cell.rowSpan)}
                        >
                          <div className="flex justify-self-center items-center gap-2 max-w-full">
                            {cell.type==="文字" && <Text cell={cell} mode={mode} />}
                            {cell.type==="單選題" && <SingleSelect cell={cell} mode={mode} response={response[cell.id]??""} updateCellResponse={updateCellResponse} />}
                            {cell.type==="巢狀單選" && <NestedSelect cell={cell} mode={mode} multiSelect={false} response={response[cell.id]??""} updateCellResponse={updateCellResponse} />}
                            {cell.type==="巢狀多選" && <NestedSelect cell={cell} mode={mode} multiSelect={true} response={response[cell.id]??""} updateCellResponse={updateCellResponse} />}
                            {cell.type==="勾選題" && <CheckBox cell={cell} mode={mode} response={response[cell.id]??""} updateCellResponse={updateCellResponse} />}
                            {cell.type==="自由填答" && <TextField cell={cell} mode={mode} response={response[cell.id]??""} updateCellResponse={updateCellResponse} />}
                            {cell.more!=="" && <ViewMore more={cell.more} color={cell.color} />}
                          </div>
                        </td>}
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>}
        </>
      ))}
    </div>
        
  );
}

export default IDPResponseTable;