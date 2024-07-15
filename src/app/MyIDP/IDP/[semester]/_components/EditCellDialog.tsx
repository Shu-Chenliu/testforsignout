"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BasicButton } from "@/app/_components/BasicButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Trash } from "react-flaticons";
import { nullCell, useEditIdpProblem } from "@/app/hooks/EditIdpProblemContext";
import * as XLSX from "xlsx-js-style";
import { RelationType } from "@/app/MyIDP/components/idpProblem/NestedSelect";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCellDialog({open,setOpen}:Props) {
  const { data, editCellIndex, editCellSectionIndex, handleEditCell } = useEditIdpProblem();
  const editCell = (editCellSectionIndex===-1) ? nullCell : data[editCellSectionIndex].sectionData[editCellIndex.i][editCellIndex.j];
  const textareaType = ["段落標題","文字","自由填答"];
  const selectType = ["勾選題","單選題"];
  const nestedSelect = ["巢狀單選","巢狀多選"];
  const [viewMore,setViewMore] = useState(false);
  const [widths, setWidths] = useState<string>("");
  // const [historyData,setHistoryData] = useState(false);
  useEffect(()=>{
    if(open) {
      setViewMore(editCell.more!=="");
      setWidths(editCell.type.includes("巢狀")?JSON.stringify(JSON.parse(editCell.content).widths).slice(1,-1):"hi");
      // setHistoryData(editCell.history!=="")
    }
  },[open])
  const handleOptionUpdate = (i:number,newOption:string,cmd:string) => { // cmd: new|update|delete
    const content = JSON.parse(editCell.content);
    const newContent:string[] = (cmd === "new") ? [...content,newOption] : //add new option
      ((cmd === "delete") ? [...content.slice(0,i),...content.slice(i+1)] :   // delete option[i]
        [...content.slice(0,i),newOption,...content.slice(i+1)]);  // update option[i] to newOption
    handleEditCell({
      ...editCell,
      content: JSON.stringify(newContent)
    },editCellSectionIndex);
  }
  const handleTextarea = (newContent:string) => {
    handleEditCell({
      ...editCell,
      content: newContent
    },editCellSectionIndex);
  }
  const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files![0]);
    reader.onload = async(e) => {
      const data = e.target!.result;
      const workbook = XLSX.read(data, { type: "array" ,cellDates: true});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
      const depth = dataArr[0].length;
      const optionsMap = new Map();
      const relations:RelationType[] = [];
      let id = 0;
      let optionId = 0;
      const parentMap = new Map();

      dataArr.forEach(row => {
        let parent:null|number = null;
        row.forEach(option => {
          if (!optionsMap.has(option)) {
            optionsMap.set(option, optionId);
            optionId++;
          }
          const currentOptionId = optionsMap.get(option);
          const optionKey = `${option}_${parent}`;
          if (!parentMap.has(optionKey)) {
            relations.push({ id, parent, option: currentOptionId });
            parentMap.set(optionKey, id);
            id++;
          }
          parent = parentMap.get(optionKey);
        });
      });
      setWidths(JSON.stringify(Array(depth).fill(100)).slice(1,-1));
      const newContent = {
        depth,
        widths:Array(depth).fill(100),
        options: Array.from(optionsMap.keys()),
        relations
      };
      handleEditCell({
        ...editCell,
        content: JSON.stringify(newContent)
      },editCellSectionIndex);
    };
  }
  const handleViewMore = (newMore:string) => {
    handleEditCell({
      ...editCell,
      more: newMore
    },editCellSectionIndex);
  }
  const handleWidth = () => {
    const optionsData = JSON.parse(editCell.content);
    const newWidths = JSON.parse('['+widths+']');
    handleEditCell({
      ...editCell,
      content: JSON.stringify({...optionsData,widths:newWidths})
    },editCellSectionIndex);
  }
  const handleClose = () => {
    if (editCell.type.includes("巢狀")) {
      const depth = JSON.parse(editCell.content).depth;
      const widthsLen = widths.split(',').length;
      if (depth != widthsLen) {
        alert(`輸入的檔案為 ${depth} 層，輸入的寬度為 ${widthsLen} 個。請確認輸入格式是否正確。`);
        return;
      }
      handleWidth();
    }
    setOpen(false);
  }
  // const handleHistoryData = (history:string) => {
  //   if (!history) return;
    // handleEditCell({
    //   ...editCell,
    //   history: history
    // });
  // }

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">編輯儲存格</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3">
          <div className="flex gap-6 text-sm font-semibold">
            <div>儲存格類型：{editCell && editCell.type}</div>
            <div className="flex gap-1">
              <input type="checkbox" 
                onChange={()=>{
                  handleViewMore("")
                  setViewMore(!viewMore)
                }}
                checked={viewMore}
              />
              <div >顯示更多</div>
            </div>
            {/* <div className="flex gap-1">
              <input type="checkbox" 
                onChange={()=>{
                  handleHistoryData(historyData?"":"歷史")
                  setHistoryData(!historyData)
                }}
                checked={historyData}
              />
              <div >歷史填答</div>
            </div> */}
          </div>
          {textareaType.includes(editCell.type) && <Textarea
            placeholder={"請輸入"+(editCell.type==="文字"?"該儲存格":(editCell.type==="自由填答"?"題示":editCell?.type))+"文字"}
            className="resize-none"
            onChange={(e)=>handleTextarea(e.target.value)}
            value={editCell.content}
          />}
          {selectType.includes(editCell.type) && <div className="flex-col flex gap-3">
            <div className="gap-1 flex-col flex overflow-auto overflow-y-auto max-h-52">
              {JSON.parse(editCell.content).map((option:string,i:number)=>(
                <div key={i.toString()} className="flex gap-2 items-center">
                  <div className="text-nowrap" style={{fontSize:12}}>{"選項"+(i+1)}</div>
                  <Input  type="text" placeholder="值" className="" value={option} onChange={(e)=>handleOptionUpdate(i,e.target.value,"update")}/>
                  <div className="cursor-pointer hover:bg-neutral-200 p-1 rounded" onClick={()=>handleOptionUpdate(i,"","delete")}><Trash size={15} /></div>
                </div>
              ))}
            </div>
            <BasicButton text="新增選項" onClick={()=>handleOptionUpdate(0,"","new")} />
          </div>}
          {nestedSelect.includes(editCell.type) && <div className="flex-col flex gap-3">
            <div className="flex gap-3 items-center">
              <div className="flex gap-6 text-sm font-semibold">寬度 (逗號隔開,無空格)</div>
              <Input className="w-64 h-8" value={widths} onChange={e=>{setWidths(e.target.value)}} />
            </div>
            <input 
              type="file"
              onChange={handleUpload}
            />
          </div>}
          {viewMore && <div className="flex text-nowrap gap-2">
            <div className="flex gap-6 text-sm font-semibold">更多</div>
            <Textarea
              placeholder={"請輸入要顯示的文字"}
              className="resize-none"
              onChange={(e)=>handleViewMore(e.target.value)}
              value={editCell.more}
            />
          </div>}
        </div>
        <DialogFooter className="items-center">
          <BasicButton width="60px" text="完成" dark={true} onClick={handleClose} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCellDialog;