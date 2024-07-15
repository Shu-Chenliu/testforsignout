"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { INDIGO, PINK } from "@/lib/constants";
import { User } from "@/lib/types/db";
import bcrypt from "bcryptjs";
import useUsers from "@/app/hooks/useUsers";
import { useToast } from '@/components/ui/use-toast';
type Props = {
  user: User;
  Open:boolean;
}

export default function ChangePasswordDialog({ user,Open }: Props) {
  const [open, setOpen] = useState(Open);
  const [originPassword, setOriginPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [passwordHint, setPasswordHint] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { updateUser } = useUsers();
  const {toast}=useToast();
  useEffect(() => {
    setOpen(Open);
  }, [Open]);
  useEffect(() => {
    setOriginPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordHint("");
    checkFirstLogin();
  }, [open]);

  const checkFirstLogin = async () => {
    const isFirstLogin = await bcrypt.compare(user.mobile, user.hashedPassword);
    setDescription(isFirstLogin ? "初次登入需修改密碼" : "");
  };
  const WRONGPW = "目前密碼輸入錯誤", INCONSISTENT = "「新密碼」與「確認新密碼」不一致";
  const handleUpdatePassword = async () => {
    const isValid = await bcrypt.compare(originPassword, user.hashedPassword);
    if (!isValid) {
      setPasswordHint(WRONGPW);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordHint(INCONSISTENT);
      return;
    }
    if (newPassword === "") {
      setPasswordHint("密碼不可為空");
      return;
    }
    setPasswordHint("");
    try{
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await updateUser({
        id: user.displayId,
        hashedPassword: hashedPassword,
      });
      toast({
        description: "password updated successfully",
        variant:"success",
      })
      setOpen(false);
    }catch(e){
      toast({
        variant: "destructive",
        description: "password updated unsuccessfully",
      })
    }
  };
  const handleInteractOutside=()=>{
    if(description!==""){
      setOpen(true);
    }
    else{
      setOpen(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <button
          className="w-36 border py-0.5 rounded-full border-black"
          style={{ backgroundColor: "white" }}
        >
          修改密碼
        </button>
      </DialogTrigger>
      <DialogContent 
        hideCloseButton={description!==""} 
        onInteractOutside={(e)=>{
          e.preventDefault();
          handleInteractOutside();
        }}
        className="w-fit"
        >
        <DialogHeader>
          <DialogTitle className="text-center">修改密碼</DialogTitle>
          {description && (
            <DialogDescription className="text-center text-xs">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3 items-center px-6">
          <div className="flex flex-col gap-2">
            <div>
              <Label className="font-semibold">目前密碼</Label>
              <Input
                type="password"
                value={originPassword}
                className="rounded-3xl border w-full w-64"
                style={{ borderColor: passwordHint===WRONGPW ? PINK : "black" }}
                onChange={(e) => setOriginPassword(e.target.value)}
              />
            </div>
            <div>
              <Label className="font-semibold">新密碼</Label>
              <Input
                type="password"
                value={newPassword}
                className="rounded-3xl border w-full w-64"
                style={{ borderColor: passwordHint===INCONSISTENT ? PINK : "black" }}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label className="font-semibold">確認新密碼</Label>
              <Input
                type="password"
                value={confirmNewPassword}
                className="rounded-3xl border w-full w-64"
                style={{ borderColor: passwordHint===INCONSISTENT ? PINK : "black", outline:"none" }}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <div className="text-xs self-center" style={{ color: PINK }}>
              {passwordHint}
            </div>
            <div
              className="cursor-pointer mt-2 justify-self-center w-fit px-4 py-1 text-white text-sm rounded-full hover:opacity-80 font-semibold self-center"
              style={{ backgroundColor: INDIGO }}
              onClick={handleUpdatePassword}
            >
              修改密碼
            </div>
          </div>
        </div>
        <DialogClose asChild />
      </DialogContent>
    </Dialog>
  );
}