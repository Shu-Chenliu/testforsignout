"use client";

import {useEditIdpProblem} from "@/app/hooks/EditIdpProblemContext";
import { INDIGO, INDIGO_1, LIGHT_GREY } from "@/lib/constants";
import SelectTypeAndEdit from "./SelectTypeAndEdit";
import Text from "@/app/MyIDP/components/idpProblem/Text";
import SingleSelect from "@/app/MyIDP/components/idpProblem/SingleSelect";
import CheckBox from "@/app/MyIDP/components/idpProblem/CheckBox";
import TextField from "@/app/MyIDP/components/idpProblem/TextField";
import EditCellDialog from "./EditCellDialog";
import ViewMore from "./ViewMore"
import SectionNameCell from "./SectionNameCell"
import NestedSelect from "@/app/MyIDP/components/idpProblem/NestedSelect";

function IDPTable() {
  const { data, preview, selected, editCellDialogOpen, previewSimplifiedVersion, setEditCellDialogOpen } = useEditIdpProblem();
  return(
    <div className="overflow-auto w-full" style={{height:"75%"}}>
      {data.length > 0 && data.map((section, sectionIndex) => (
        <>
          <div className="pb-4"></div>
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
                      fontSize: 18
                    }}
                    colSpan={section.width.length}>
                    <SectionNameCell sectionIndex={sectionIndex} sectionName={section.sectionName} widths={JSON.stringify(section.width)} />
                  </td>
                </tr>
                {section.sectionData.map((row,i) => (
                  <tr key={"sectionData-map-"+i}>
                    {row.map((cell,j) => (
                      <>  
                        {cell.type!=="null" && (cell.simplifiedVersion || (!cell.simplifiedVersion&&!previewSimplifiedVersion)) && <td key={"cell"+j} 
                          className="px-2 py-1" 
                          style={{
                            border: "2px solid white",
                            backgroundColor: selected.includes(cell.id)?(cell.color==="dark"?INDIGO_1:"white"):(cell.color==="dark"?INDIGO:LIGHT_GREY),
                            width: (cell.colSpan==="1")?(section.width[j]).toString()+"%":(section.width.slice(j, j+parseInt(cell.colSpan)).reduce((acc, curr) => acc + curr, 0)).toString()+"%",
                          }}
                          colSpan={parseInt(cell.colSpan)} 
                          rowSpan={parseInt(cell.rowSpan)}
                        >
                          <div className="flex justify-self-center items-center gap-2 max-w-full w-full">
                            {!preview && <SelectTypeAndEdit cellIndex={{i,j}} cell={cell} sectionIndex={sectionIndex} />}
                            {/* {(cell.colSpan==="1")?(section.width[j]).toString()+"%":(section.width.slice(j, j+parseInt(cell.colSpan)).reduce((acc, curr) => acc + curr, 0)).toString()+"%"} */}
                            <div className="flex-grow max-w-full w-full" style={{color: cell.color==="dark"?"white":"black"}}>
                              {cell.type==="文字" && <Text cell={cell} mode={"edit"} />}
                              {cell.type==="單選題" && <SingleSelect cell={cell} mode={"edit"} />}
                              {cell.type==="巢狀單選" && <NestedSelect cell={cell} mode={"edit"} multiSelect={false} />}
                              {cell.type==="巢狀多選" && <NestedSelect cell={cell} mode={"edit"} multiSelect={true} />}
                              {cell.type==="勾選題" && <CheckBox cell={cell} mode={"edit"} />}
                              {cell.type==="自由填答" && <TextField cell={cell} mode={"edit"} />}
                              {cell.more!=="" && <ViewMore more={cell.more} color={cell.color} />}
                            </div>
                          </div>
                        </td>}
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>}
            <EditCellDialog open={editCellDialogOpen} setOpen={setEditCellDialogOpen} />
        </>
      ))}
    </div>
  );
}

export default IDPTable;