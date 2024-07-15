import {getData} from "./components/actions";
import UploadCourseButton from "./components/uploadCourseButton";
import { SelectAndTable } from "./components/SelectAndTable";
export default async function CourseMap(){
  const data=await getData();
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">課程地圖</p>
        <UploadCourseButton/>
      </div>
      <SelectAndTable data={data}/>
    </div>
  );
}