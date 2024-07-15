import {getData} from "./components/actions";
import {Button} from "@/components/ui/button";
import { ADMIN, INDIGO } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
export default async function MyLectureHistory(){
  const session = await auth();
  const email=session?.user?.email;
  if(!email){
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const data=await getData(email);
  const years=new Set<string>();
  const bigCategory=new Set<string>();
  const serieses=new Set<string>();
  data.forEach((d)=>{
    years.add(d.course.year);
    bigCategory.add(d.course.type.bigCategory);
    serieses.add(d.course.series);
  });
  const year=[] as string[];
  const bigCategories=[] as string[];
  const series=[] as string[];
  for(const y of years){
    year.push(y);
  }
  for(const y of serieses){
    series.push(y);
  }
  for(const y of bigCategory){
    bigCategories.push(y);
  }
  const authority = session?.user?.authority;
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">{authority!==ADMIN ? "我的" : "教師"}講師紀錄</p>
      </div>
      <SelectAndData years={year} types={bigCategories} series={series} data={data}/>
      <div className="grid justify-items-center mt-5 ">
        <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}}>
          {"匯出"}
        </Button>
      </div>
    </div>
  );
}