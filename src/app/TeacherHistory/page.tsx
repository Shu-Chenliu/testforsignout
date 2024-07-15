import {getTeachers,getTypes,getSeries,getYears,getData,getTopics,getCourse} from "./components/actions";
import {Button} from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
export default async function MyLectureHistory(){
  const teachers=getTeachers();
  const years=getYears();
  const types=getTypes();
  const topics=getTopics();
  const series=getSeries();
  const data=getData();
  const course=getCourse();
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">教師修課紀錄</p>
      </div>
      <SelectAndData teachers={teachers} years={years} types={types} series={series} data={data} topics={topics} course={course}/>
      <div className="grid justify-items-center mt-5 ">
        <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}}>
          {"匯出"}
        </Button>
      </div>
    </div>
  );
}