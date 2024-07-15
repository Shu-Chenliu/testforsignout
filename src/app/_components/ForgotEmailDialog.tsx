"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label"
// import Resizer from "react-image-file-resizer";
import { INDIGO, ORANGE, PINK, /*USERS*/ } from "@/lib/constants";
import useUsers from "@/app/hooks/useUsers";
import { Input } from "@/components/ui/input";
function ForgotEmailDialog() {
  const [userMobile, setUserMobile] = useState<string>("");
  const [hint, setHint] = useState<string>("");
  const {getUserByMobileOrEmail}=useUsers();
  const WRONG_MOBILE = "手機號碼有誤";
  const handleSubmit = async() => {
    // const userIndex = USERS.findIndex(({ mobile }) => mobile === userMobile);
    try {
      const user=await getUserByMobileOrEmail({
        mobile:userMobile,
      });
      console.log(user);
      if (!user) {
        // setHint("您的帳號不存在，請聯繫學校或基金會負責夥伴以建立帳號");
        setHint(WRONG_MOBILE);
        console.log("invalid phone number");
        return;
      }
      const email = user.email;
      const accountLength = email.split("@")[0].length;
      setHint("您的帳號為 "+email.substring(0,2)+"*".repeat(accountLength-3)+email.substring(accountLength-2));
    } catch (e) {
      setHint(WRONG_MOBILE);
      return;
    }
  };

  return(
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:underline" style={{color: ORANGE}}>
          帳號
        </div>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="text-center">忘記帳號</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-3 px-6">
          <div>
            <Label className="font-semibold">手機號碼</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={userMobile}
                className="rounded-3xl border w-full w-64"
                style={{ borderColor: hint===WRONG_MOBILE ? PINK : "black" }}
                onChange={(e) => setUserMobile(e.target.value)}
              />
              <Button onClick={() => {handleSubmit()}} className="rounded-full font-semibold text-sm" style={{backgroundColor: INDIGO}}>
                確認
              </Button>
            </div>
          </div>
          <div className="text-xs self-center" style={{color:hint===WRONG_MOBILE?PINK:"black"}}>{hint}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotEmailDialog;