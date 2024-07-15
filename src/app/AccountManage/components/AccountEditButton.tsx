"use client"
import { Button } from "@/components/ui/button"
import { INDIGO, ORANGE } from "@/lib/constants";

// Define the props for the action button component
type Props={
  isEditing: boolean,
  handleClick:()=>void,
  authority:string,
  handleCancel:()=>void,
}
export default function AccountEditButton ({isEditing,handleClick,authority,handleCancel}:Props){
  // const handleClick =()=>{
  //   if(isEditing){
  //     setIsEditing(false);
  //   }
  //   else{
  //     setIsEditing(true);
  //   }
  // }

  return (
    <div className='flex'>
      <Button
        className={"rounded-full ml-2"}
        style={{
          backgroundColor:isEditing ?ORANGE:INDIGO,
        }}
        disabled={authority !=='A'&&authority!=='B'&&authority!=='C'}
        onClick={handleClick}
      >
        {isEditing ? "完成":"編輯"}
      </Button>
      {isEditing&&<Button
        className={"rounded-full ml-2 opacity-80"}
        style={{
          backgroundColor:INDIGO,
        }}
        onClick={handleCancel}
      >
        {"取消"}
      </Button>}
    </div>
    
  );
};
