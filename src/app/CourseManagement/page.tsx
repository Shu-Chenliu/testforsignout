import LinkBox from "./components/LinkBox";
async function CourseManagement() {

  return (
    <div className="grid h-full p-16 justify-items-center">
      <div className="grid justify-center mt-14 mb-10">
        <p className="text-3xl text-[#013E6E]">匯入課程相關資料</p>
      </div>
      <div className="w-5/6 grid grid-flow-col gap-2 justify-items-center">
        <LinkBox time="前" button="匯入課程清單" destination="/LectureRecords"/>
        <LinkBox time="後" button="匯入教師選課結果" destination="/LectureRecords"/>
        <LinkBox time="課程後" button="匯入單堂課程回饋" destination="/LectureRecords"/>
      </div>
    </div>
  );
}
export default CourseManagement;
