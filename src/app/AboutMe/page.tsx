import { ADMIN, INDIGO } from "@/lib/constants";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { MdPerson } from "react-icons/md";
import { auth } from "@/lib/auth";
import AboutAdminInfo from "./_components/AboutAdminInfo";
import AboutMeInfo from "./_components/AboutMeInfo";
import { BiSolidPhoneCall } from "react-icons/bi";
import Bottombar from "@/app/_components/Bottombar";
import { getUserByEmail } from "./_components/actions";
import { User } from "@/lib/types/db";
import ChangePasswordDialog from "./_components/ChangePasswordDialog";
import ChangeMobileDialog from "./_components/ChangeMobileDialog";
import ChangeAvatarDialog from "./_components/ChangeAvatarDialog";
export default async function AboutMe(){
  const session = await auth();
  const email = session?.user?.email;
  if(!email){
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const user=await getUserByEmail(email);
  if(!user){
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  return(
    <>
      <div className="grid h-full p-16">
        <a className="mb-8 h-8 inline-flex items-center text-sm font-medium font-semibold gap-1 text-gray-700 hover:opacity-80">
          {">"}<MdPerson />關於我
        </a>
        <div className="grid grid-flow-col ml-4 content-center h-[65vh] items-center">
          <div className="col-span-2 flex flex-col gap-2 items-center">
            <ChangeAvatarDialog imageURL={user.imageURL??""} userId={user.displayId} />
            <div className="text-2xl font-bold mt-2">
              {user.username}
            </div>
            <div className="flex flex-row gap-1.5">
              <div className="mt-1">
                <BiSolidPhoneCall color={INDIGO} />
              </div>
              {user.mobile}
            </div>
            <ChangePasswordDialog user={user as User} Open={false} />
            <ChangeMobileDialog user={user as User} />
          </div>
          <div className="col-span-3">
            { user.authority === ADMIN ? <AboutAdminInfo /> : <AboutMeInfo /> }
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  );
}