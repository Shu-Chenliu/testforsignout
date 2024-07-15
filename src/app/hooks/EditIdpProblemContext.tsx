"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cell, Section, CellIndex, Res } from "@/types/type";
import { v4 as uuidv4 } from 'uuid';
// import { useRouter } from "next/navigation";
import useIdpProblem from "./useIdpProblem";
import useIdpStatus from "./useIdpStatus";

const initCell = {
  id: "",
  type: "文字",     
  bold: false,    
  color: "light",   
  history: "",     
  more: "",      
  size: 15,    
  content: "內容", 
  rowSpan: "1",
  colSpan: "1",
  simplifiedVersion: false,
};
export const nullCell = {
  id: "",
  type: "null",     
  bold: false,    
  color: "light",   
  history: "",     
  more: "",      
  size: 15,    
  content: "", 
  rowSpan: "1",
  colSpan: "1",
  simplifiedVersion: false,
};
const sectionCell = {
  id: "",
  type: "段落標題",     
  bold: true,    
  color: "dark",   
  history: "",     
  more: "",      
  size: 18,    
  content: "Part", 
  rowSpan: "1",
  colSpan: "full",
  simplifiedVersion: false,
};
function newCell(type:string) {
  let cell:Cell = initCell;
  switch(type) {
      case "section":
          cell = sectionCell;
          break;
      case "null":
          cell = nullCell;
          break;
      default:
          break;
  }
  cell.id = uuidv4();
  return JSON.parse(JSON.stringify(cell));
}

type EditIdpProblemContextType = {
  initData: (semester_: string) => Promise<number>,
  data: Section[];
  selected: string[];
  selectedSection: number;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  setSemester: React.Dispatch<React.SetStateAction<string>>,
  handleCheck: (id:string, sectionIndex:number, cmd:string) => Res,
  handleType: (newType:string, cell:Cell, sectionIndex:number) => Res,
  handleEdit: (cellIndex: {i:number,j:number},sectionIndex:number, editSectionName: boolean) => void,
  handleCombine: () => Res,
  appendRow: () => Res,
  appendCol: () => Res,
  appendSection: () => Res,
  deleteRow: () => Res,
  deleteCol: () => Res,
  deleteSection: () => Res,
  editCellDialogOpen: boolean,
  setEditCellDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleEditCell: (newCell: Cell,sectionIndex:number) => Res
  editCellIndex: {i:number,j:number},
  editCellSectionIndex: number,
  handleCopy: () => Res,
  handlePaste: () => Res,
  handleColor: (color:string) => Res,
  handleSectionName: (newSectionName:string,sectionIndex:number) => void,
  handlePreview: () => void,
  preview: boolean,
  handleWidth: (d:number) => Res,
  exportData: () => void,
  handleUpload: (e:React.ChangeEvent<HTMLInputElement>) => void,
  setData: React.Dispatch<React.SetStateAction<Section[]>>,
  released: boolean,
  semester: string,
  handlePreviousStep: () => Res,
  handleSimplified: (newSimplified:boolean) => Res,
  previewSimplifiedVersion: boolean,
  setPreviewSimplifiedVersion: React.Dispatch<React.SetStateAction<boolean>>,
};

const EditIdpProblemContext = createContext<EditIdpProblemContextType|null>(null);

export const EditIdpProblemProvider = ({children}:{children:React.ReactNode}) => {
  const [data, setData] = useState<Section[]>([]);
  const [dataHistory, setDataHistory] = useState<Section[][]>([]);
  const [semester, setSemester] = useState<string>("");
  const [released, setReleased] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [copied, setCopied] = useState<Cell>(nullCell);
  const [editCellIndex,setEditCellIndex] = useState<{i:number,j:number}>({i:-1,j:-1});
  const [editCellSectionIndex,setEditCellSectionIndex] = useState<number>(-1);

  const [editCellDialogOpen,setEditCellDialogOpen] = useState(false);
  const [preview,setPreview] = useState(false);
  const [previewSimplifiedVersion,setPreviewSimplifiedVersion] = useState(false);
  // const router = useRouter();

  const { getIdpProblem } = useIdpProblem();
  const { getIdpSemesterStatus } = useIdpStatus();

  const COMBINE = "combine";
  const SIMPLIFIED = "simplified";

  useEffect(()=>{
    if (!data) return;
    const len = dataHistory.length;
    if (len === 0) {
      setDataHistory([data]);
    }
    else  if (len >= 10) {
      setDataHistory([...dataHistory.slice(1,10),data]);
    }
    else if (data !== dataHistory[len-1]) {
      // console.log(len+1);
      // console.log(dataHistory)
      setDataHistory([...dataHistory,data]);
    }
  },[data])

  const initData = async (semester_:string) => {
    if (!semester_) return;
    try {
      const {versionId,released} = await getIdpSemesterStatus(semester_);
      setReleased(released);
      const data_ = await getIdpProblem(versionId);
      setData(data_);
      return versionId;
    } catch (e) {
      alert("something wrong");
    }
  }

  const verifySelectOne = () => {
    if (selected.length !== 1) {
      return {ok: false, error: "請選擇 一個 儲存格"};
    }
    return {ok: true, error: ""};
  }
  const verifyRowNoNull = (i:number,sectionIndex:number) => {
    const sectionData = data[sectionIndex].sectionData;
    for (let j=0; j<sectionData[0].length; j++) {
      if (sectionData[i][j].type==="null") {
        return {ok:false,error:"含合併的儲存格"}
      }
    }
    return {ok:true,error:""}
  }
  const verifyColNoNull = (j:number,sectionIndex:number) => {
    const sectionData = data[sectionIndex].sectionData;
    for (let i=0; i<sectionData.length; i++) {
      if (sectionData[i][j].type==="null") {
        return {ok:false,error:"含合併的儲存格"}
      }
    }
    return {ok:true,error:""}
  }
  const verifyRowNoRowSpan = (i:number,sectionIndex:number) => {
    const sectionData = data[sectionIndex].sectionData;
    for (let j=0; j<sectionData[0].length; j++) {
      if (sectionData[i][j].rowSpan!=="1") {
        return {ok:false,error:"含合併的儲存格"}
      }
    }
    return {ok:true,error:""}
  }
  const verifyColNoColSpan = (j:number,sectionIndex:number) => {
    const sectionData = data[sectionIndex].sectionData;
    for (let i=0; i<sectionData.length; i++) {
      if (sectionData[i][j].colSpan!=="1") {
        return {ok:false,error:"含合併的儲存格"}
      }
    }
    return {ok:true,error:""}
  }
  const initSelected = () => {
    setSelected([]);
    setSelectedSection(-1);
  }
  const updateSectionData = (newCell:Cell, sectionData:Cell[][]) => {
    return sectionData.map((row)=>(
      row.map((cell) => (
        cell.id === newCell.id ? newCell : {...cell}
      ))
    ));
  }
  const updateData = (newSection:Section, sectionIndex:number) => {
    return [
      ...data.slice(0,sectionIndex),
      newSection,    
      ...data.slice(sectionIndex+1), 
    ]
  }
  const getIndexes = (ids:string[]) => {
    let indexes:CellIndex[] = [];
    const sectionData = data[selectedSection].sectionData;
    let minI = sectionData.length, maxI = 0;
    let minJ = sectionData.length, maxJ = 0; 
    sectionData.forEach((row,i) => {
        row.forEach((cell,j) => {
            if (ids.includes(cell.id)) {
                indexes = [...indexes,{i, j}]
                minI = Math.min(i,minI);
                minJ = Math.min(j,minJ);
                maxI = Math.max(i+parseInt(cell.rowSpan)-1,maxI);
                maxJ = Math.max(j+parseInt(cell.colSpan)-1,maxJ);
            }
        })
    });
    indexes.sort(function(a, b) {
        if (a.i !== b.i) {
            return a.i - b.i;
        }
        return a.j - b.j;
    });
    return {indexes,minI,maxI,minJ,maxJ};
  }
  // 插入
  const appendCol = () => {
    if (data.length < 1) {
      return {ok:false,error:"請先新增段落"};
    }
    const res0 = verifySelectOne();
    if (!res0.ok) return res0;
    const selected0 = getIndexes(selected).indexes[0];
    const res1 = verifyColNoNull(selected0.j,selectedSection);
    if (!res1.ok) return res1;
    const section = data[selectedSection];
    const sectionData = section.sectionData;
    const newSectionData = sectionData.map((row)=>(
      [ ...row.slice(0,selected0.j),
        newCell("init"),
        ...row.slice(selected0.j)]
    ));
    const width = section.width;
    const newWidth = [
      ...width.slice(0, selected0.j),
      Math.floor(width[selected0.j]/2),
      Math.ceil(width[selected0.j]/2),
      ...width.slice(selected0.j+1)
    ];
    setData(updateData(
      { ...section,
        width: newWidth,
        sectionData: newSectionData
      },selectedSection
    ));
    initSelected();
    return {ok:true,error:""};
  }
  const appendRow = () => {
    if (data.length < 1) {
      return {ok:false,error:"請先新增段落"};
    }
    const res0 = verifySelectOne();
    if (!res0.ok && selectedSection!==-1) return res0;
    const selectedSection_ = (selectedSection===-1) ? data.length-1 : selectedSection;
    const lastSectionData = data[data.length-1].sectionData;
    const selected0 =  (selectedSection===-1) ? {i:lastSectionData.length,j:lastSectionData[0].length-1} : getIndexes(selected).indexes[0];
    if (selectedSection!==-1) {
      const res1 = verifyRowNoNull(selected0.i,selectedSection);
      if (!res1.ok) return res1;
    }
    const section = data[selectedSection_];
    const sectionData = section.sectionData;
    const cols = (sectionData.length===0)?4:sectionData[0].length;
    const _row:Cell[] = [];
    Array.from(Array(cols)).forEach(() => {
        _row.push(newCell("init"));
    });
    const newSectionData = [
      ...sectionData.slice(0, selected0.i),
      _row,
      ...sectionData.slice(selected0.i)
    ];
    setData(updateData(
      { ...section,
        sectionData: newSectionData
      },selectedSection_
    ));
    initSelected();
    return {ok:true,error:""};
  }
  const appendSection = () => {
    const selectedSection_ = (selectedSection === -1) ? data.length : selectedSection;
    const res = verifySelectOne();
    if (!res.ok && (selectedSection !== -1)) return res;
    const _row:Cell[] = [];
    Array.from(Array(4)).forEach(() => {
      _row.push(newCell("init"));
    });
    setData([
      ...data.slice(0,selectedSection_),
      {
        sectionId: uuidv4(),
        sectionName: "段落標題",
        width: [25,25,25,25],
        sectionData: [_row]
      },    
      ...data.slice(selectedSection_),
    ]);
    initSelected();
    return {ok:true,error:""}
  }
  // 刪除
  const deleteCol = () => {
    if (data.length < 1) {
      return {ok:false,error:"請先新增段落"};
    }
    const res0 = verifySelectOne();
    if (!res0.ok) return res0;
    const selected0 = getIndexes(selected).indexes[0];
    const res1 = verifyColNoNull(selected0.j,selectedSection);
    if (!res1.ok) return res1;
    const res2 = verifyColNoColSpan(selected0.j,selectedSection);
    if (!res2.ok) return res2;
    const section = data[selectedSection];
    const sectionData = section.sectionData;
    if (sectionData[0].length === 1) {
      return {ok:false,error:"每列至少保留一欄"};
    }
    const newSectionData = sectionData.map((row)=>(
      [...row.slice(0, selected0.j),...row.slice(selected0.j+1)]
    ));
    const width = section.width;
    const newWidth = (selected0.j===0) ? [
      width[selected0.j]+width[selected0.j+1],
      ...width.slice(selected0.j+2)
    ] : [
      ...width.slice(0, selected0.j-1),
      width[selected0.j-1]+width[selected0.j],
      ...width.slice(selected0.j+1)
    ];
    setData(updateData(
      { ...section,
        width: newWidth,
        sectionData: newSectionData
      },selectedSection
    ));
    initSelected();
    return {ok:true,error:""};
  }
  const deleteRow = () => {
    if (data.length < 1) {
      return {ok:false,error:"請先新增段落"};
    }
    const res = verifySelectOne();
    if (!res.ok) return res;
    const selected0 = getIndexes(selected).indexes[0];
    const res1 = verifyRowNoNull(selected0.i,selectedSection);
    if (!res1.ok) return res1;
    const res2 = verifyRowNoRowSpan(selected0.i,selectedSection);
    if (!res2.ok) return res2;
    const section = data[selectedSection];
    const sectionData = section.sectionData;
    if (sectionData.length === 1) {
      return {ok:false,error:"每段落至少保留一列"};
    }
    const newSectionData = [
      ...sectionData.slice(0, selected0.i),
      ...sectionData.slice(selected0.i+1)
    ];
    setData(updateData(
      { ...section,
        sectionData: newSectionData
      },selectedSection
    ));
    initSelected();
    return {ok:true,error:""};
  }
  const deleteSection = () => {
    if (data.length < 1) {
      return {ok:false,error:"請先新增段落"};
    }
    const res = verifySelectOne();
    if (!res.ok) return res;
    setData([
      ...data.slice(0,selectedSection),
      ...data.slice(selectedSection+1), 
    ]);
    initSelected();
    return {ok:true,error:""};
  }
  // 勾選選取
  const handleCheck = (id:string, sectionIndex:number, cmd:string) => {
    // 取消全選
    if (cmd === "none") {
      initSelected();
      return {ok:true,error:""};
    }
    // 全選 加入所有id
    if (cmd === "all") {
      const res = verifySelectOne();
      if (!res.ok) return res;
      let allIndex:string[] = [];
      data[selectedSection].sectionData.forEach((row) => {
        row.forEach((cell) => {
          allIndex = [...allIndex,cell.id]
        })
      });
      setSelected(allIndex)
      return {ok:true,error:""};
    }
    // 本來已選->取消
    if (selected.includes(id)) {
      if (selected.length === 1) {
        setSelectedSection(-1);
      }
      setSelected(selected.filter((_id) => _id != id));
    }
    // 本來未選->加入
    else {
      if (selected.length === 0) {
        setSelectedSection(sectionIndex);
      }
      else if (sectionIndex !== selectedSection) {
        return {ok:false,error:"請選取同個段落的儲存格"};
      }
      setSelected([...selected,id])
    }
    return {ok:true,error:""};
  };
  // 變更Cell類型
  const handleType = (newType:string, cell:Cell, sectionIndex:number) => {
    const textType   = ["文字","自由填答"];
    const selectType = ["單選題","勾選題"];
    const nestedType = ["巢狀單選","巢狀多選"];
    let newContent = cell.content;
    const isText = textType.includes(cell.type);
    const toBeText = textType.includes(newType);
    const isSelect = selectType.includes(cell.type);
    const toBeSelect = selectType.includes(newType);
    const isNested = nestedType.includes(cell.type);
    const toBeNested = nestedType.includes(newType);
    if (isText && toBeSelect) {  //文字->選擇
      newContent = JSON.stringify([cell.content]);
    }
    else if (isText && toBeNested) {  //文字->巢狀
      newContent = JSON.stringify({
        depth: 1,
        widths: [100],
        options: [cell.content],
        relations: [{id:0,parent:null,option:0}]
      });
    }
    else if (isSelect && toBeText) {  //選擇->文字
      newContent = JSON.parse(cell.content).length>0?JSON.parse(cell.content)[0]:"";
    }
    else if (isSelect && toBeNested) {  // 選擇->巢狀
      newContent = JSON.stringify({
        depth: 1,
        widths: [100],
        options: [JSON.parse(cell.content).length>0?JSON.parse(cell.content)[0]:""],
        relations: [{id:0,parent:null,option:0}]
      });
    }
    else if (isNested && toBeText) {  // 巢狀->文字
      newContent = JSON.parse(cell.content).depth>0?JSON.parse(cell.content).options[0]:"";
    }
    else if (isNested && toBeSelect) {  // 巢狀->選擇
      newContent = JSON.stringify([JSON.parse(cell.content).depth>0?JSON.parse(cell.content).options[0]:""]);
    }
    const section = data[sectionIndex];
    const newSectionData = updateSectionData({
      ...cell,
      type: newType,
      content: newContent
    },section.sectionData);
    setData(updateData(
      {...section,sectionData:newSectionData},sectionIndex
    ));
    return {ok:true,error:""};
  }
  // 編輯Cell內容
  const handleEditCell = (newCell:Cell,sectionIndex:number) => {
    const section = data[sectionIndex];
    const newSectionData = updateSectionData(newCell,section.sectionData);
    setData(updateData(
      {...section,sectionData:newSectionData},sectionIndex
    ));
    return {ok:true,error:""};
  }
  // 編輯SectionName內容
  const handleSectionName = (newSectionName:string,sectionIndex:number) => {
    const section = data[sectionIndex];
    setData(updateData(
      {...section,sectionName:newSectionName},sectionIndex
    ));
    return {ok:true,error:""};
  }
  // 開啟編輯視窗
  const handleEdit = (cellIndex:{i:number,j:number},sectionIndex:number,editSectionName:boolean) => {
    if(editSectionName && !editSectionName) return;
    setEditCellIndex(cellIndex);
    setEditCellSectionIndex(sectionIndex);
    setEditCellDialogOpen(true);
  }
  // 切換預覽模式
  const handlePreview = () => {
    setPreview(!preview);
  }
  const handleCombine = () => {
    try {
      if (selected.length < 2) {
        return {ok:false,error:"請選擇要合併的儲存格"};
      }
      const {inARange,rowSpan,colSpan,leftTopIndex,error} = checkInARange(COMBINE);
      if (!inARange) {
        return {ok:false,error};
      }
      initSelected();
      // 除了最左上角的Cell，其他要合併的type變成null，才不會顯示
      const newSectionData:Cell[][] = setToNullThenSpan(rowSpan,colSpan,leftTopIndex);
      setData(updateData(
        { ...data[selectedSection],
          sectionData: newSectionData
        },selectedSection
      ));
      return {ok:true,error:""};
    } catch (_) {
      return {ok:false,error:"something went wrong"}
    }
  }
  const checkInARange = (func:string) => {
    const {indexes, minI, maxI, minJ, maxJ} = getIndexes(selected);
    let inARange = true;
    let error = "";
    const sectionData = data[selectedSection].sectionData;
    if (func===SIMPLIFIED) {
      if (minJ!==0 || maxJ!==sectionData[0].length-1) {
        inARange = false;
        error = "請確認同列需被全部選擇";
        return {inARange, rowSpan: maxI-minI+1, colSpan: maxJ-minJ+1, leftTopIndex: indexes[0], error};
      }
    }
    for (let i=minI; i<=maxI; i++) {
        for (let j=minJ; j<=maxJ; j++) {
            if (!selected.includes(sectionData[i][j].id)) {
              if (func===COMBINE) {
                inARange = false;
                error = "儲存格合併衝突(請確保要合併的儲存格連續，無已合併之儲存格)";
              }
              else if (func===SIMPLIFIED && sectionData[i][j].type!=="null") {
                inARange = false;
                error = "請確保要切換版本的儲存格連續，同列需被全部選擇";
              }
            }
            else if ((sectionData[i][j].colSpan!=="1" || sectionData[i][j].rowSpan!=="1")&&inARange&&func===COMBINE) {
              inARange = false;
              error = "儲存格合併衝突(請確保要合併的儲存格連續，無已合併之儲存格)";
            }
        }
    }
    return {inARange, rowSpan: maxI-minI+1, colSpan: maxJ-minJ+1, leftTopIndex: indexes[0], error};
  }
  const setToNullThenSpan = (rowSpan: number,colSpan: number, leftTopIndex: CellIndex) => {
    const fromI = leftTopIndex.i, fromJ = leftTopIndex.j;
    const toI = fromI+rowSpan, toJ = fromJ+colSpan; 
    const sectionData = data[selectedSection].sectionData;
    return sectionData.map((row,i)=>(
      row.map((cell,j) => (
        (i>=fromI && i<toI && j>=fromJ && j<toJ) ? ((i===fromI && j===fromJ) ? {
          ...cell,
          rowSpan: (rowSpan).toString(),
          colSpan: (colSpan).toString()
        } : {
          id: cell.id,
          type: "null",     
          bold: false,    
          color: "light",   
          history: "",     
          more: "",      
          size: 15,    
          content: "", 
          rowSpan: "1",
          colSpan: "1",
          simplifiedVersion: false,
        }) : {...cell}
      ))
  ));
  }
  const handleCopy = () => {
    const res0 = verifySelectOne();
    if (!res0.ok) return res0;
    const selected0 = getIndexes(selected).indexes[0];
    setCopied(data[selectedSection].sectionData[selected0.i][selected0.j]);
    return {ok:true,error:""};
  }
  const handlePaste = () => {
    if (copied.type==="null") {
      return {ok:false,error:"剪貼簿無資料，請先複製再貼上"}
    }
    const res0 = verifySelectOne();
    if (!res0.ok) return res0;
    const selected0 = getIndexes(selected).indexes[0];
    const cell = data[selectedSection].sectionData[selected0.i][selected0.j];
    handleEditCell({
      ...cell,
      type: copied.type,
      content: copied.content
    },selectedSection)
    return {ok:true,error:""};
  }
  const handleColor = (color:string) => {
    // const res0 = verifySelectOne();
    // if (!res0.ok) return res0;
    if (selected.length === 0) return {ok:false,error:"請選擇要變更顏色的儲存格"};
    // const indexes = getIndexes(selected).indexes;
    // console.log(indexes);
    const sectionData = data[selectedSection].sectionData;
    const newSectionData = sectionData.map((row)=>(
      row.map((cell) => (
        (selected.includes(cell.id)) ? {...cell,color} : {...cell}
      ))
    ));
    setData(updateData(
      {...data[selectedSection],sectionData:newSectionData},selectedSection
    ));
    return {ok:true,error:""};
  }
  // 編輯欄位寬度
  const handleWidth = (d:number) => {
    const res0 = verifySelectOne();
    if (!res0.ok) return res0;
    const section = data[selectedSection];
    const col = section.sectionData[0].length
    if (col === 1) {
      return {ok:false,error:"欄位已經是100%"};
    } 
    const {i,j} = getIndexes(selected).indexes[0];
    const sectionWidth = section.width;
    const availableRange = (x:number) => { return x>0 && x<100; }
    const editRightAvailable = (j+1 < col && section.sectionData[i][j+1].type!=="null" && availableRange(sectionWidth[j]+d) && availableRange(sectionWidth[j+1]-d));
    const editLeftAvailable  = (j-1 >= 0  && section.sectionData[i][j-1].type!=="null" && availableRange(sectionWidth[j-1]-d) && availableRange(sectionWidth[j]+d));
    if (!(editRightAvailable || editLeftAvailable)) return {ok:false,error:"欄位寬度已達限制"};   
    let newWidth:number[];
    if (editRightAvailable) newWidth = [
      ...sectionWidth.slice(0,j),
      sectionWidth[j]+d,
      sectionWidth[j+1]-d,
      ...sectionWidth.slice(j+2),
    ];
    else newWidth = [
      ...sectionWidth.slice(0,j-1),
      sectionWidth[j-1]-d,
      sectionWidth[j]+d,
      ...sectionWidth.slice(j+1),
    ]
    console.log(sectionWidth);
    console.log(newWidth);
    setData(updateData(
      {...section,
        width:newWidth
      },selectedSection
    ));
    return {ok:true,error:""};
  }
  const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const input = e.target as HTMLInputElement;
    if (input.files) {
      fileReader.readAsText(input.files[0], "UTF-8");
    }
    else return;
    fileReader.onload = (e) => {
      if (!e.target) return;
      setData(JSON.parse(e.target.result as string));
    };
  }

  const handlePreviousStep = () => {
    if (dataHistory.length < 1) {
      return {ok:false, error:"只可以回復到前十步"};
    }
    const previousData = dataHistory[dataHistory.length-2];
    if (!previousData) {
      return {ok:false, error:"只可以回復到前十步"};
    }
    setDataHistory(dataHistory.slice(0,dataHistory.length-1))
    setData(previousData);
    return {ok:true,error:""};
  }

  const handleSimplified = (newSimplified:boolean) => {
    try {
      if (selected.length < 1) {
        return {ok:false,error:"請選擇要切換版本的儲存格"};
      }
      const {inARange,error} = checkInARange(SIMPLIFIED);
      if (!inARange) {
        return {ok:false,error};
      }
      initSelected();
      const newSectionData:Cell[][] = setSimplified(newSimplified);
      setData(updateData(
        { ...data[selectedSection],
          sectionData: newSectionData
        },selectedSection
      ));
      return {ok:true,error:""};
    } catch (_) {
      return {ok:false,error:"something went wrong"}
    }
  }
  const setSimplified= (newSimplified:boolean) => {
    const sectionData = data[selectedSection].sectionData;
    return sectionData.map((row)=>(
      row.map((cell) => (
        (selected.includes(cell.id)) ? {
          ...cell,
          simplifiedVersion: newSimplified,
        } : {...cell}
      ))
  ));
  }

  // 下載 data
  function exportData() {
    const fileData = JSON.stringify(data);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = Date().toLocaleString()+"-IDP.json";
    link.href = url;
    link.click();
  }

  return (
    <EditIdpProblemContext.Provider value={{
      initData,
      data,
      selected,
      setSelected,
      selectedSection,
      setSemester,
      handleCheck,
      handleType,
      handleEdit,
      handleCombine,
      appendRow,
      appendCol,
      appendSection,
      deleteRow,
      deleteCol,
      deleteSection,
      editCellIndex,
      editCellSectionIndex,
      editCellDialogOpen,
      setEditCellDialogOpen,
      handleEditCell,
      handleCopy,
      handlePaste,
      handleColor,
      handleSectionName,
      handlePreview,
      preview,
      handleWidth,
      exportData,
      handleUpload,
      setData,
      released,
      semester,
      handlePreviousStep,
      handleSimplified,
      setPreviewSimplifiedVersion,
      previewSimplifiedVersion
    }}>
      {children}
    </EditIdpProblemContext.Provider>
  );
  // return {
  //   data,
  //   setData,
  //   selected,
  //   setSelected,
  //   handleCheck,
  //   handleType,
  //   handleEdit,
  //   appendRow,
  //   appendSection,
  // };
}

export const useEditIdpProblem = () => {
  const context = useContext(EditIdpProblemContext);
  if (!context) {
      throw new Error('useEditIdpProblem must be used within a EditIdpProblemProvider');
  }
  return context;
};