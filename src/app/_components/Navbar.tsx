import { auth } from "@/lib/auth";
import React from "react";
import Link from "next/link";
import Image from "next/image"
// import { auth } from "@/lib/auth";
import { INDIGO } from "@/lib/constants";
import LoginDialog from "./LoginDialog";
import { NavbarMenu } from "./NavbarMenu";
import { getUserByEmail } from "./actions";
import { sendMail } from "./mailService";
async function Navbar() {
  const session = await auth();
  alert(session);
  const notAuth = (!session || !session?.user?.email);
  let user=null;
  if(!notAuth) {
    const email=session.user?.email;
    if(!email) return;
    user=await getUserByEmail(email);
  }
  // if(!user){
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  const sendEmail=async(to:string,title:string,emailContent:string)=>{
    "use server";
    await sendMail("",to, "密碼重設驗證碼", emailContent);
  }
  
  return (
    <nav style={{ backgroundColor: INDIGO }} className="z-50 fixed flex justify-between items-center w-full max-w-8xl px-10 py-3">
      <div className="flex gap-3">
        <button className="flex gap-2.5">
          <Link href={`/`} className="flex gap-2">
            <Image
              width={30}
              height={30}
              alt="KIST"
              src="/logo.png"
            />
            <div className="text-white hover:opacity-80 text-lg font-semibold">
              教師發展平台
            </div>
          </Link>
        </button>
      </div>
      <div className="flex items-center justify-self-end text-white">
        { !user ?
          <LoginDialog sendEmail={sendEmail}/> :
          <NavbarMenu user={user}/>
        }
      </div>
    </nav>
  );
}

export default Navbar;