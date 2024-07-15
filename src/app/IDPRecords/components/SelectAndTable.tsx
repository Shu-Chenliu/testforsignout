"use client";
import {useState} from 'react';
import { adminColumns, columns, principalColumns } from "./Columns";
import { DataTable } from "./data-table";
import Selection from "./Select";
import { Section } from '@/types/type';
import { ADMIN, INDIGO, LEADERS, PRINCIPAL, TEACHER } from '@/lib/constants';
import { BasicButton } from '@/app/_components/BasicButton';
import MultiSelect from './MultiSelect';
import * as XLSX from 'xlsx';
import { SelectChangeEvent } from '@mui/material/Select';
import { ResponseType } from '@/types/type';
import IDPReportTable from './IDPReportTable';
import { MdRemoveRedEye } from 'react-icons/md';
import { OptionsDataType, RelationType } from '@/app/MyIDP/components/idpProblem/NestedSelect';
type IDPRecordsProps={
  authority: string,
  semesters:string[],
  schools:string[],
  names:string[],
  data: {
    responseDisplayId: string,
    semester: string,
    updateTime: string,
    status: string,
    response: unknown,
    notes: string,
    school: string|null,
    username: string|null,
    versionId: number,
    data: Section[]
  }[],
}
export default function SelectAndData({authority,semesters,schools,names,data}:IDPRecordsProps){
  const [selectedSemester, setSelectedSemester] = useState<string[]>(semesters??[]);
  const [selectedSchool, setSelectedSchool] = useState(schools.length===1?schools[0]:"all");
  const [selectedName, setSelectedName] = useState(authority===TEACHER?names[0]:"all");
  const [viewReport,setViewReport] = useState(false);
  const [tableData,setTableData] = useState<string[][]>([]);
  const handleSemesterChange = (event: SelectChangeEvent<typeof selectedSemester>) => {
    const {
      target: { value },
    } = event;
    setSelectedSemester(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleSchoolChange = (value:string) => {
    setSelectedSchool(value);
  };
  const handleNameChange = (value:string) => {
    setSelectedName(value);
  };
  const dataToShow = data
    .filter((d) => (
      (selectedSemester.includes(d.semester)) &&
      (d.school === selectedSchool || selectedSchool === "all") &&
      (d.username === selectedName || selectedName === "all")
  ));
  const handleViewReport = () => {
    const uniqueVersions = [...new Set(dataToShow.map(item => item.versionId??""))];
    if (uniqueVersions.length !== 1) {
      alert("報表只能選擇擁有相同 IDP 版本題目的資料")
      return;
    }
    const wsData = [];
    const sections = dataToShow[0].data;
    const maxTextInRow = Math.max(
      ...sections.map(section =>
        Math.max(
          ...section.sectionData.map(row =>
            row.filter(cell => cell.type === '文字').length
          )
        )
      )
    );
    const emptyRow = Array(maxTextInRow).fill('');
    const semesterRow = [...emptyRow,"期間",...dataToShow.map(item => item.semester)];
    const schoolRow = [...emptyRow,"學校/單位",...dataToShow.map(item => item.school)];
    const usernameRow = [...emptyRow,"姓名",...dataToShow.map(item => item.username)];
    const updateTimeRow = [...emptyRow,"更新時間",...dataToShow.map(item => item.updateTime)];
    const isProblem = ["單選題","勾選題","自由填答","巢狀單選","巢狀多選"];
    wsData.push(semesterRow);
    wsData.push(schoolRow);
    wsData.push(usernameRow);
    wsData.push(updateTimeRow);
    sections.forEach(section => {
      section.sectionData.forEach((row_,j) => {
        let row:string[] = [];
        if (j === 0) row.push(section.sectionName);
        // const texts = row_.filter(cell => cell.type === '文字');
        const texts:string[] = [];
        const responses:string[] = [];
        let checkOpt:string[] = [];
        let nestedOptionText:string[];
        let nestedRelations:RelationType[];
        if (row_.filter(cell => (isProblem.includes(cell.type))).length > 0) {
          row_.forEach((cell) => {
            if (cell.type === "文字") texts.push(cell.content);
            else if (isProblem.includes(cell.type)) {
              if (cell.type === "勾選題") checkOpt = JSON.parse(cell.content);
              else if (cell.type.includes("巢狀")) {
                const nestedData:OptionsDataType = JSON.parse(cell.content)
                nestedOptionText = nestedData.options;
                nestedRelations = nestedData.relations;
              } 
              dataToShow.forEach((user,ui) => {
                const response = user.response as ResponseType;
                let ans = "";
                if (cell.type === "單選題" || cell.type === "自由填答") {
                  ans = response[cell.id] ?? "-";
                }
                else if (cell.type === "勾選題") {
                  if (response[cell.id]) {
                    JSON.parse(response[cell.id]).forEach((tf:boolean,opti:number) => {
                      if (tf) {
                        if (ans === "") ans = checkOpt[opti];
                        else ans += ("\n"+checkOpt[opti]);
                      }
                    });
                  }
                  else ans = "-";
                }
                else if (cell.type.includes("巢狀")) {
                  const ids = JSON.parse(response[cell.id]).flat();
                  if (response[cell.id] && ids.length>0) {
                    ids.forEach((optionId:number|null) => {  // concat?
                      if (optionId!==null) {
                        const text = nestedOptionText[nestedRelations[optionId].option];
                        if (ans === "") ans = text;
                        else ans += ("\n"+text);
                      }
                    });
                  }
                  else ans = "-";
                }
                if (ui >= responses.length) responses.push(ans)
                else responses[ui] += ("\n\n"+ans)
              })            
            }
          })
          const padding = new Array(maxTextInRow + 1 - (texts.length+row.length)).fill("");
          row = [...row,...padding,...texts,...responses];
          wsData.push(row);
        }        
      })
    });
    setTableData(wsData);
    setViewReport(true);
  }
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table.xlsx');
  }
  return(
    <>
      {/* <SuccessDialog/> */}
      <div className="mb-8 h-8 inline-flex items-center text-sm cursor-pointer font-medium font-semibold gap-1 text-gray-700 hover:opacity-80" onClick={()=>{setViewReport(false)}}>
        {viewReport ? "> 歷史 IDP" : ""}
      </div>
      <div className="grid justify-center mb-5 gap-3">
        <p className="text-3xl text-[#013E6E] text-center">{viewReport ? "歷史 IDP 報表版" : "歷史 IDP"}</p>
        {!viewReport && <BasicButton dark={false} text="查看報表版" width="130px" element={<MdRemoveRedEye color={INDIGO} />} onClick={handleViewReport} />}
      </div>
      {viewReport ?
        <div className="flex justify-center gap-3 mb-3">
          <BasicButton dark={true} text='匯出 xlsx 檔' onClick={handleExportExcel} />
          <BasicButton dark={false} text='返回歷史 IDP' onClick={()=>{setViewReport(false)}} />
        </div> :
        <div className="flex justify-center gap-1 mb-3">
          <div className="flex gap-1 items-center w-1/5">
            <p className="">時間</p>
            <MultiSelect semesters={semesters} onChange={handleSemesterChange} selected={selectedSemester}/>
          </div>
          {LEADERS.includes(authority) && <div className="flex gap-1 items-center w-1/5">
            <p className="">教師</p>
            <Selection selections={names} onChange={handleNameChange}/>
          </div>}
          {authority===ADMIN && <div className="flex gap-1 items-center w-1/5">
            <p className="">學校/單位</p>
            <Selection selections={schools} onChange={handleSchoolChange}/>
          </div>}
        </div>}
      <div className="px-4 w-full h-full justify-self-center flex-col items-center">
        { viewReport ?
          <IDPReportTable data={tableData} />
          : <DataTable columns={authority===PRINCIPAL ? [...columns,...principalColumns] : (authority===ADMIN ? [...adminColumns,...columns] : columns)} data={dataToShow}/>
        }
      </div>
    </>
  );
}