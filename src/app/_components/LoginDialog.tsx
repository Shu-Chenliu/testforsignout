"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { signIn } from "next-auth/react";
// import Resizer from "react-image-file-resizer";
import { publicEnv } from "@/lib/env/public";
import AuthInput from "./AuthInput";
import { MdLogin } from "react-icons/md";
import { INDIGO } from "@/lib/constants";
import ForgotEmailDialog from "./ForgotEmailDialog";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
// import { useToast } from '@/components/ui/use-toast';
// import { useRouter } from "next/navigation";
type Props={
  sendEmail:(to:string,title:string,emailContent:string)=>void,
};
function LoginDialog({sendEmail}:Props) {
  const [open,setOpen]=useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const {toast}=useToast();
  // const router=useRouter();
  // const [username, setUsername] =useState<string>("");
  // const [phoneNumber,setPhoneNumber] =useState<string>("");
  // const username = "";
  // const phoneNumber = "";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      username:"",
      password,
      mobile:"",
      school:"",
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/AboutMe`,
      // redirect:false,
    });
    // if((result)&&(result.error==="CredentialsSignin")){
    //   toast({
    //     variant: "destructive",
    //     // title: " Fail to Upload",
    //     description: "輸入的帳號不存在或有誤，請再次輸入",
    //   });
    // }
    // else if(result&&result.error==="CallbackRouteError"){
    //   toast({
    //     variant: "destructive",
    //     // title: " Fail to Upload",
    //     description: "輸入的密碼不正確，請再次輸入",
    //   });
    // }
    // else if (result && !result.error) {
      
    //   router.push(result.url || `${publicEnv.NEXT_PUBLIC_BASE_URL}/AboutMe`);
    //   router.refresh();
    //   setOpen(false);
    // }
    // else{
    //   await signIn("credentials", {
    //     email,
    //     username,
    //     password,
    //     mobile:phoneNumber,
    //     callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/AboutMe`,
    //   });
    // }
  };

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={()=>setOpen(true)}>
        <button className="flex items-center gap-2 text-white rounded-sm hover:opacity-80 px-2 font-semibold"><MdLogin size={20} /><div>登入</div></button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="text-center">登入</DialogTitle>
        </DialogHeader>
        <div className="pt-3">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AuthInput
              label="帳號"
              type="email"
              value={email}
              placeholder="電子郵件"
              setValue={setEmail}
            />
            <AuthInput
              label="密碼"
              type="password"
              value={password}
              placeholder="預設為手機號碼"
              setValue={setPassword}
            />
            {/* <AuthInput
              label="使用者名稱"
              type="username"
              value={username}
              placeholder=""
              setValue={setUsername}
            />
            <AuthInput
              label="電話"
              type="phoneNumber"
              value={phoneNumber}
              placeholder="手機號碼"
              setValue={setPhoneNumber}
            /> */}
            <span className="flex text-xs self-center py-1">
              忘記&nbsp;
              <ForgotEmailDialog />
              /
              <ForgotPasswordDialog sendEmail={sendEmail}/>
            </span>
            <div className="pt-2"></div>
            <Button type="submit" className="w-full rounded-full font-semibold text-base" style={{backgroundColor: INDIGO}}>
              登入
            </Button>
          </form>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;