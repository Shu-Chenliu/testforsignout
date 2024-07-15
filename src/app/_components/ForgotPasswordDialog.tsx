"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import Resizer from "react-image-file-resizer";
import { GREEN, INDIGO, ORANGE, PINK,/* USERS*/ } from "@/lib/constants";
import { generateCode } from "@/lib/utils";
import useUsers from "@/app/hooks/useUsers";
import bcrypt from "bcryptjs";
type Props={
  sendEmail:(to:string,title:string,emailContent:string)=>void,
};
// import useSWR, { Fetcher } from "swr";
function ForgotPasswordDialog({sendEmail}:Props ) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailHint, setEmailHint] = useState<string>("");
  const sent = "已發送驗證碼至信箱";

  const [getCode, setGetCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [codeInput, setCodeInput] = useState<string>("");
  const [codeHint, setCodeHint] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [passwordHint, setPasswordHint] = useState<string>("");
  const{getUserByMobileOrEmail,updateUser}=useUsers();

  const handleGetCode = async() => {
    // const userIndex = USERS.findIndex(({ email }) => email === userEmail);
    const user=await getUserByMobileOrEmail({
      email: userEmail,
    });
    if (!user) {
      setEmailHint("此帳號無註冊");
      setGetCode(false);
      return;
    }
    console.log(user);
    setEmailHint(sent);
    setGetCode(true);

    const code_ = generateCode(6);
    setCode(code_);
    // setCode(generateCode(6));
    console.log(code_);
    const emailContent = `
      <div>
        <p>您的驗證碼是：<strong>${code_}</strong></p>
      </div>
    `;
    sendEmail(userEmail,"密碼重設驗證碼",emailContent);
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
  const handleUpdatePassword = async() => {
    const user=await getUserByMobileOrEmail({
      email: userEmail,
    });
    if(!user){
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordHint("密碼不一致");
      return;
    }
    else if (newPassword === user.mobile) {
      setPasswordHint("密碼與手機號碼相同");
      return;
    }
    setPasswordHint("");
    setVerified(true);
    const pswd=await bcrypt.hash(newPassword, 10);
    await updateUser({
      id:user.displayId,
      hashedPassword:pswd,
    })
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:underline" style={{color: ORANGE}}>
          密碼
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">忘記密碼</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3">
          <div className="flex flex-col gap-2">
            <div>
              <Label className="font-semibold">帳號</Label>
              <Input
                type="email"
                value={userEmail}
                placeholder="電子郵件"
                className="rounded-3xl border"
                style={{borderColor: INDIGO}}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                disabled={getCode}
              />
            </div>
            { emailHint !== sent && <div className="text-xs self-center" style={{color: PINK}}>{emailHint}</div>}
            <div className="flex gap-2 items-center">
              <Button disabled={getCode} onClick={() => {handleGetCode()}} className="rounded-full font-semibold text-sm w-fit" style={{backgroundColor: INDIGO}}>
                取得驗證碼
              </Button>
              { emailHint === sent && <div className="text-xs">{emailHint}</div>}
            </div>
          </div>
          { getCode && <div className="flex flex-col gap-2">
            <div>
              <Label className="font-semibold">驗證碼</Label>
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
          { verified && <div className="flex flex-col gap-2">
            <div>
              <Label className="font-semibold">新密碼</Label>
              <Input
                type="password"
                value={newPassword}
                className="rounded-3xl border w-full"
                style={{borderColor: INDIGO}}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <Label className="font-semibold">確認新密碼</Label>
              <Input
                type="password"
                value={confirmNewPassword}
                className="rounded-3xl border w-full"
                style={{borderColor: INDIGO}}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                }}
              />
            </div>
            <div className="text-xs self-center" style={{color: PINK}}>{passwordHint}</div>
            <Button 
              type="submit" 
              className="mt-2 w-fit rounded-full font-semibold self-center" 
              style={{backgroundColor: INDIGO}}
              onClick={() => {handleUpdatePassword()}}
            >
              修改密碼
            </Button>
          </div>
        }
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;