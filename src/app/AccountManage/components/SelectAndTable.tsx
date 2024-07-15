"use client";
import {useState} from 'react';
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import Selection from "./Select";
import { SelectChangeEvent } from '@mui/material/Select';
import UploadButton from "./UploadButton";
import MultiSelect from "./MultiSelect";
import { Button } from '@/components/ui/button';
import { ADMIN, INDIGO, ORANGE } from "@/lib/constants";
import useUsers from '@/app/hooks/useUsers';
import useExperience from '@/app/hooks/useExperience';
type ExportHistoryProps={
  years:string[],
  schools:string[],
  usernames:string[],
  data: {
    id:number,
    semester:string,
    username:string,
    email:string,
    mobile:string,
    school:string,
    position:string,
    subject:string,
    role:string,
    feature:string,
    authority:string,
    displayId:string,
    disable:boolean,
  }[],
  authority:string,
  school:string
}
// type EditableKeys = 'school' | 'position' | 'subject' | 'role' | 'feature' | 'authority';
export default function SelectAndData({years,schools,data,authority,school}:ExportHistoryProps){
  const [selectedYear, setSelectedYear] = useState("all");
  const [isEditing,setIsEditing]=useState(false);
  const [newData,setNewData]=useState(data);
  const {updateUser}=useUsers();
  const {updateExperience}=useExperience();
  const handleYearChange2 = (value:string) => {
    setSelectedYear(value);
  };
  // Handler function for topic selection change
  const [schoolName, setSchoolName] = useState<string[]>(authority===ADMIN?schools:[school]);

  const handleChange = (event: SelectChangeEvent<typeof schoolName>) => {
    const {
      target: { value },
    } = event;
    setSchoolName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleClick=()=>{
    if(isEditing){
      setIsEditing(false);
    }
    else{
      setIsEditing(true);
    }
  }
  const dataToShow=newData.filter((d)=>(
    (d.semester===selectedYear||selectedYear==='all')&&(schoolName.includes(d.school))))
    .map((d)=>({...d,isEditing,
      onChange: (cell:string, content:string|boolean) => {
        setNewData(prevData => {
          const updatedData = [...prevData];
          const index = updatedData.findIndex(da => da.id === d.id);
          if (index !== -1) {
            updatedData[index] = {
              ...updatedData[index],
              [cell]: content,
            };
          }
          return updatedData;
        });
      }
    }));
  const handleSave=async()=>{
    for(const d of newData){
      // const toUpdate=data.findIndex(da=>da.displayId===d.displayId);
      /* NOTE: 
        this function updates info after pressing save btn (update current period info)
        another case that need to update info is after uploading the users file, 
        it need to be compared with old data (see slides p41 comments)
      */
      await updateUser({
        id:d.displayId,
        authority:d.authority,
        disable:d.disable,
      });
      await updateExperience({
        id: d.id,
        school: d.school,
        position:d.position,
        subject: d.subject,
        role: d.role,
        feature: d.feature,
      })
      setIsEditing(false);
    }
  }
  return(
    <div className='grid justify-items-center'>
      {authority===ADMIN && <div className="flex justify-center gap-1 w-80">
        <UploadButton/>
      </div>}
      <div className='grid grid-cols-3 gap-4 w-5/6 mt-2'>
        <div className='flex items-center col-span-2'>
          <p className="">現有帳號列表</p>
          <div className='grid w-1/5 justify-items-center ml-2 mr-2'>
            <Selection selections={years} onChange={handleYearChange2}/>
          </div>
          {authority===ADMIN && <MultiSelect schools={schools} onChange={handleChange} schoolName={schoolName}/>}
        </div>
        <div className='grid justify-items-end col-span-1'>
          {!isEditing && <Button
            className={"rounded-full ml-2"}
            style={{
              backgroundColor:ORANGE,
            }}
            disabled={authority !=='A'&&authority!=='B'&&authority!=='C'}
            onClick={handleClick}
          >
            編輯
          </Button>}
          {/* <AccountEditButton isEditing={isEditing} handleClick={handleClick} authority={authority} handleCancel={handleCancel}/> */}
        </div>
      </div>
      {/* <div>{JSON.stringify(newData)}</div> */}
      <div className="w-5/6 h-full justify-self-center mt-2">
        <DataTable columns={columns} data={dataToShow}/>
      </div>
      <div className="grid w-5/6 justify-self-center justify-items-end mt-4">
        {isEditing && <Button 
          className="text-white rounded-full h-9" 
          style={{backgroundColor:INDIGO}}
          onClick={handleSave}
        >
          {"儲存"}
        </Button>}
      </div>
    </div>
  );
}