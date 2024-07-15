import {getData} from "./components/actions";
import SelectAndData from "./components/SelectAndTable";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { auth } from "@/lib/auth";
export default async function MyLectureHistory(){
  const session = await auth();
  const username=session?.user?.username;
  if(!username){
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const data=await getData();
  const years = [...new Set(data.map(item => item.year))];
  const types = [...new Set(data.map(item => item.type.bigCategory))];
  const series = [...new Set(data.map(item => item.series))];
  const courses = [...new Set(data.map(item => item.name))];

  return(
    <>
      <div className="grid h-full p-16">
        <div className="grid justify-center mt-14 mb-5">
          <p className="text-3xl text-[#013E6E]">課程清單</p>
        </div>
        <SelectAndData years={years} types={types} series={series} data={data} username={username} courses={courses}/>
      </div>
    </>
  );
}