// import {getTypes,getSeries,getYears,getData,getCourse} from "./components/actions";
import { ADMIN, TEACHER } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { auth } from "@/lib/auth";
import { getData } from "./components/actions";
import { Section } from "@/types/type";
export default async function IDPRecords(){
  const session = await auth();
  const username = session?.user?.username;
  const school = session?.user?.school;
  const authority = session?.user?.authority??"";
  if(!username){
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const data=await getData() as {
    responseDisplayId: string,
    semester: string,
    updateTime: string,
    status: string,
    response: unknown,
    notes: string,
    school: string|null,
    username: string|null,
    versionId: number,
    data: Section[]
  }[];
  const uniqueSchools = [...new Set(data.map(item => item.school??""))];
  const schools = authority===ADMIN ? uniqueSchools : [school??""];
  const semesters = [...new Set(data.map(item => item.semester))];
  const names = authority===TEACHER ? [username] : [...new Set(data.map(item => item.username??""))];
  return(
    <>
      <div className="grid h-full p-16">
        {/* <div>{JSON.stringify(schools)}</div> */}
        <SelectAndData authority={authority} semesters={semesters} schools={schools} names={names} data={data}/>
      </div>
    </>
  );
}