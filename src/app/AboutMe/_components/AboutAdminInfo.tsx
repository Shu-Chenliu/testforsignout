import React from "react";
import { INDIGO } from "@/lib/constants";

function AboutAdminInfo() {
  return (
    <div className="w-11/12 px-2 flex gap-3 items-center text-center" style={{height: "70vh"}}>
      <div className="rounded-3xl border-2 h-full w-full p-4 flex-col flex gap-4" style={{borderColor: INDIGO, color: INDIGO}}>
        <p className="py-3 text-2xl">平台管理</p>
        <a href="/AccountManage" className="underline">匯入與管理帳號</a>
        <a href="https://docs.google.com/document/d/1_VTtYwjhO20ZlA8Wvp8aQPZhXjYhAxBFTsgIPfsTAPQ/" className="underline">查看平台管理手冊</a>
        <a href="https://docs.google.com/document/d/11KO_bzcrAci17EQuLdWby3AuMHK6qaBWzWvYJN8y-14/edit" className="underline">編輯隱私管理辦法</a>
      </div>
      <div className="rounded-3xl border-2 h-full w-full p-4 flex-col flex gap-3" style={{borderColor: INDIGO, color: INDIGO}}>
        <p className="py-3 text-2xl">課程管理</p>
        <a href="/CourseManagement" className="underline">匯入課程相關資料</a>
        <a href="/CourseManagement/LectureRecords" className="underline">查看課程清單</a>
        <a href="/CourseHistory/ExportHistory" className="underline">查看教師修課清單</a>
        <a href="/TeacherHistory" className="underline">查看教師教學經歷表</a>
      </div>
      <div className="rounded-3xl border-2 h-full w-full p-4 flex-col flex gap-3" style={{borderColor: INDIGO, color: INDIGO}}>
        <p className="py-3 text-2xl">IDP管理</p>
        <a href="/MyIDP" className="underline">匯入與編輯 IDP</a>
        <a href="/IDPRecords" className="underline">檢視與匯出教師 IDP</a>
      </div>
    </div>
  );
}

export default AboutAdminInfo;
