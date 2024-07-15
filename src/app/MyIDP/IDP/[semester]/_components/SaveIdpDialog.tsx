"use client";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BasicButton } from "@/app/_components/BasicButton";
import { useEditIdpProblem } from "@/app/hooks/EditIdpProblemContext";
import useIdpProblem from "@/app/hooks/useIdpProblem";
import useIdpStatus from "@/app/hooks/useIdpStatus";

type Props = {
  version: number;
  semester: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SaveIdpDialog({version,semester,open,setOpen}:Props) {
  const { updateExistingIdpVersion } = useIdpProblem();
  const { updateIdpStatus } = useIdpStatus();
  const { data, released } = useEditIdpProblem();
  const handleUpdateData = async () => {
    console.log("handle update");
    await updateExistingIdpVersion({
      versionId: version,
      data: data
    });
    await updateIdpStatus({
      semester,
      updateTime: new Date().toLocaleTimeString(),
      idpVersion: version,
      released,
  });
    setOpen(false);
  }
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <BasicButton text="儲存" dark={false} size={14} onClick={()=>{}} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">確認儲存</DialogTitle>
        </DialogHeader>
        <div>
          <div>我要儲存的學期是 {semester}。</div>
          <div>選擇的是 IDP 版本 {version}。</div>
          <div>我知道其他也選擇這個版本的 IDP 題目也會跟著更新。</div>
        </div>
        <DialogFooter className="items-center">
          <BasicButton width="60px" text="取消" dark={false} onClick={()=>{setOpen(false)}} />
          <BasicButton width="60px" text="確認" dark={true} onClick={()=>{handleUpdateData()}} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaveIdpDialog;