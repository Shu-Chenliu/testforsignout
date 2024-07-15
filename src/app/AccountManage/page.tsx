import { getExperiences } from "./components/actions";
import SelectAndData from "./components/SelectAndTable";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { auth } from "@/lib/auth";
import { ADMIN, DIRECTOR_EDITABLE, PRINCIPAL } from "@/lib/constants";
export default async function ExportHistory(){
  const users=await getExperiences();
  const session = await auth();
  const authority = session?.user?.authority;
  const school = session?.user?.school;
  if(!authority || !(authority===ADMIN || authority===PRINCIPAL || authority===DIRECTOR_EDITABLE)){
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const data=[] as {
    id:number,
    semester:string,
    username:string,
    email:string,
    mobile:string,
    school:string,
    position:string,
    subject:string,
    role:string,
    feature:string,
    displayId:string,
    authority:string,
    disable:boolean,
  }[];
  users.forEach((u)=>{
    data.push({
      id:u.id,
      semester:u.semester,
      username:u.user.username,
      email:u.user.email,
      mobile:u.user.mobile,
      school:u.school,
      position:u.position,
      subject:u.subject,
      role:u.role,
      feature:u.feature,
      displayId:u.user.displayId,
      authority:u.user.authority,
      disable:u.user.disable,
    });
  });
  const semesters = [...new Set(data.map(item => item.semester))];
  const schools = [...new Set(data.map(item => item.school))];
  const usernames = [...new Set(data.map(item => item.username))];
  return(
    <div className="grid h-full p-14">
      <div className="grid justify-center mt-14 mb-5">
      </div>
      <SelectAndData years={semesters} data={data} schools={schools} usernames={usernames} authority={authority} school={school??""} />
    </div>
  );
}