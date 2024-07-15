"use client"
import { Input} from "@/components/ui/input";
import { ChangeEvent } from "react";
// Define the props for the action button component
type Props={
  value: string,
  handleChange:(e:ChangeEvent<HTMLInputElement>)=>void,
}
export default function EditingInput ({value,handleChange}:Props){
  // const handleClick =()=>{
  //   if(isEditing){
  //     setIsEditing(false);
  //   }
  //   else{
  //     setIsEditing(true);
  //   }
  // }

  return (
    <Input
      className=''
      onChange={handleChange}
      value={value}
    />
  );
};
