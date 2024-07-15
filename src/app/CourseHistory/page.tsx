import { getData } from "./_components/actions";
import Frame from "./_components/Frame";
import { auth } from "@/lib/auth";
export default async function CourseHistory(){
  const session = await auth();
  const email = session?.user?.email ?? "";
  const courseObj = await getData(email);
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">我的修課紀錄</p>
      </div>
      <div className="grid justify-items-center mt-5">
        {courseObj && <Frame courseObj={courseObj} />}
      </div>
    </div>
  );
}