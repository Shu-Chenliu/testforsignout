import {getData} from "./components/actions";
import { ADMIN, TEACHER } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
import { auth } from "@/lib/auth";
export default async function ExportHistory(){
  const data=await getData();
  const session = await auth();
  const authority = session?.user?.authority;
  const mySchool = session?.user?.school;
  const myName = session?.user?.username;
  const years = [...new Set(data.map(item => item.course.year))];
  const name = [...new Set(data.map(item => item.student.username))];
  const bigCategory = [...new Set(data.map(item => item.course.type.bigCategory))];
  const middleCategory = [...new Set(data.map(item => item.course.type.middleCategory))];
  const series = [...new Set(data.map(item => item.course.series))];
  const courses = [...new Set(data.map(item => item.course.name))];
  const school = [...new Set(data.map(item => item.student.experiences[0].school))];
  return(
    <div className="grid h-full p-14">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">修課紀錄與匯出設定</p>
      </div>
      <SelectAndData 
        data={data} 
        authority={authority??""} 
        years={years} 
        name={authority===TEACHER?[myName??""]:name} 
        bigCategory={bigCategory} 
        middleCategory={middleCategory} 
        series={series} 
        courses={courses} 
        school={authority===ADMIN?school:[mySchool??""]} />
    </div>
  );
}