"use client";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BasicButton } from "@/app/_components/BasicButton";
import { useWriteIdp } from "@/app/hooks/WriteIdpContext";
import { MdSaveAlt } from "react-icons/md";
import { INDIGO, LIGHT_BLUE } from "@/lib/constants";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SaveWriteIdpDialog({open,setOpen}:Props) {
  const { handleSaveResponse } = useWriteIdp();
  const handleUpdateResponse = async () => {
    handleSaveResponse("b");
    setOpen(false);
  }
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <BasicButton text="送出" dark={true} size={14} onClick={()=>{}} /> */}
        <button 
          style={{backgroundColor:LIGHT_BLUE}} 
          className="flex items-center justify-center rounded-sm text-sm hover:opacity-90"
          onClick={()=>{setOpen(true)}} >
          <MdSaveAlt size={26} color={INDIGO} className="mx-4 my-2" />
        </button>
        {/* <BasicButton text="儲存" dark={false} width="50px" /> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">溫馨提醒</DialogTitle>
        </DialogHeader>
        <div className="items-center flex-col justify-center text-center">
          <div>定期自我評估和反思可以讓我們成為更好的自己😊</div>
          <div>別忘了之後再回到「我的 IDP」繼續編輯唷！</div>
        </div>
        <DialogFooter>
          <div className="items-center justify-center gap-4 flex w-full">
            <BasicButton width="80px" text="確定儲存" dark={true} onClick={()=>{handleUpdateResponse()}} />
            <BasicButton width="60px" text="取消" dark={false} onClick={()=>{setOpen(false)}} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaveWriteIdpDialog;