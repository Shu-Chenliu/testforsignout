"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import Resizer from "react-image-file-resizer";
import { GREEN, INDIGO, PINK,/* USERS*/ } from "@/lib/constants";
import { generateCode } from "@/lib/utils";
import useUsers from "@/app/hooks/useUsers";
import { User } from "@/lib/types/db";
type Props={
  user:User;
}
export default function ChangeMobileDialog({user}:Props) {
  const [open, setOpen] = useState(false);
  const [newMobile, setNewMobile] = useState<string>("");
  const [mobileHint, setMobileHint] = useState<string>("");
  const SENT = "已發送驗證碼至信箱";

  const [getCode, setGetCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [codeHint, setCodeHint] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const{updateUser}=useUsers();

  const handleGetCode = async() => {
    const code_ = generateCode(6);
    setCode(code_);
    console.log(code_);
    // const SMSContent = `
    //   <div>
    //     <p>教師發展平台驗證碼：${code_}</p>
    //   </div>
    // `;
    // sendEmail(userEmail,"密碼重設驗證碼",emailContent);
    setMobileHint(SENT);
    setGetCode(true);
  };
  const handleVerifyCode = () => {
    if (codeInput !== code) {
      setVerified(false);
      setCodeHint("驗證失敗");
      return;
    }
    setCodeHint("驗證成功");
    setVerified(true);
  };
  const handleUpdateMobile = async() => {
    await updateUser({
      id:user.displayId,
      mobile:newMobile,
    })
    initAll();
    setOpen(false);
  };
  const initAll = () => {
    setNewMobile("");
    setMobileHint("");
    setGetCode(false);
    setCode("");
    setCodeInput("");
    setCodeHint("");
    setVerified(false);
  }

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-36 border py-0.5 rounded-full border-black"
          style={{ backgroundColor: "white" }}
        >
          修改手機號碼
        </button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="text-center">修改手機號碼</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col gap-3 pt-3 w-full">
            <div>
              <Label className="font-semibold">新手機號碼</Label>
              <Input
                type="text"
                value={newMobile}
                placeholder="09xxxxxxxx"
                className="rounded-3xl border w-64"
                style={{borderColor: "black"}}
                onChange={(e) => {
                  setNewMobile(e.target.value);
                }}
                disabled={getCode}
              />
            </div>
            {/* { emailHint !== sent && <div className="text-xs self-center" style={{color: PINK}}>{emailHint}</div>} */}
            <div className="flex gap-2 items-center">
              <Button disabled={getCode} onClick={() => {handleGetCode()}} className="rounded-full font-semibold text-sm w-fit" style={{backgroundColor: INDIGO}}>
                取得驗證碼
              </Button>
              { mobileHint === SENT && <div className="text-xs" color="gray">{mobileHint}</div>}
            </div>
          </div>
          { getCode && <div className="flex flex-col gap-2 w-full">
            <div>
              <Label className="font-semibold">輸入驗證碼</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={codeInput}
                  placeholder="xxxxxx"
                  className="rounded-3xl border w-full"
                  style={{borderColor: INDIGO}}
                  onChange={(e) => {
                    setCodeInput(e.target.value);
                  }}
                  disabled={verified}
                />
                <Button disabled={verified} onClick={() => {handleVerifyCode()}} className="rounded-full font-semibold text-sm" style={{backgroundColor: INDIGO}}>
                  驗證
                </Button>
              </div>
            </div>
            <div className="text-xs self-center" style={{color: verified ? GREEN : PINK}}>{codeHint}</div>
          </div>}
          { verified && 
            <Button 
                type="submit" 
                className="w-fit mt-1 rounded-full font-semibold" 
                style={{backgroundColor: INDIGO}}
                onClick={() => {handleUpdateMobile()}}
              >
                修改手機號碼
            </Button> }
        </div>
      </DialogContent>
    </Dialog>
  );
}