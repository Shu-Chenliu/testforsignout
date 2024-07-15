"use client";
import React from "react";
// import { auth } from "@/lib/auth";
import { INDIGO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import ChangeMobileDialog from "./ChangeMobileDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { User } from "@/lib/types/db";
import bcrypt from "bcryptjs";
import { useState,useEffect } from "react";
type Props={
  user:User;
}
function Bottombarbar({user}:Props) {
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    const checkFirstLogin = async () => {
      const result = await bcrypt.compare(user.mobile, user.hashedPassword);
      setIsFirstLogin(result);
      console.log('Comparison result:', result); // Logs the result of the comparison
    };

    checkFirstLogin();
  }, [user.mobile, user.hashedPassword]);

  // useEffect to log updated state after re-render
  useEffect(() => {
    console.log('isFirstLogin state:', isFirstLogin); // Logs updated state
  }, [isFirstLogin]);
  return (
    <>
      <nav className="fixed bottom-0 w-full h-12 flex flex-row mx-4">
        <div className="w-1/2 flex flex-row ml-6">
          <ChangePasswordDialog user={user} Open={isFirstLogin}/>
          <ChangeMobileDialog user={user}/>
        </div>
        <div className="w-1/2 flex justify-end mr-6">
          <Button
            style={{ 
              backgroundColor:"white",
              boxShadow:"none",
              color:INDIGO,
            }}
            className=""
          >
            <a href="https://docs.google.com/document/d/1_VTtYwjhO20ZlA8Wvp8aQPZhXjYhAxBFTsgIPfsTAPQ/" rel="noopener noreferrer" target="_blank">
              查看操作手冊
            </a>
          </Button>
          <Button
            style={{ 
              backgroundColor:"white",
              boxShadow:"none",
              color:INDIGO,
            }}
            className=""
          >
            <a href="https://docs.google.com/document/d/11KO_bzcrAci17EQuLdWby3AuMHK6qaBWzWvYJN8y-14/edit" rel="noopener noreferrer" target="_blank">
              查看隱私管理辦法
            </a>
          </Button>
        </div>
      </nav>
      
    </>
  );
}

export default Bottombarbar;
