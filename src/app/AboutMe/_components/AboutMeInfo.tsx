import React from "react";
import { INDIGO } from "@/lib/constants";
import { auth } from "@/lib/auth";
import LabelText from "./LabelText";
import { getUserExperience } from "./actions";
type UserExperience = {
  school: string;
  role: string;
  subject: string;
  position: string;
  feature: string;
  semester: string;
};
async function AboutMeInfo() {
  const map=new Map<keyof UserExperience,string>([
    ["school","學校/單位"],
    ["role","聯盟角色"],
    ["subject","校內課程"],
    ["position","校內職務"],
    ["feature","KIST 教學特色"]
  ]);
  const session = await auth();
  const email = session?.user?.email;
  if(!email) return;
  const experience = await getUserExperience(email);
  return (
    <div className="w-3/4 grid gap-3 items-left content-center">
      <p className="text-5xl" style={{color: INDIGO}}>個人資料</p>
      <div className="rounded-3xl w-full py-6 gap-3 flex flex-col" style={{borderColor: INDIGO}}>
        {experience && (Object.keys(experience) as Array<keyof UserExperience>).map((key) => {
          if (!map.get(key)) {
            return null;
          }
          return <LabelText key={key} label={map.get(key)!} text={experience[key]??""} />
        })}
      </div>
    </div>
  );
}

export default AboutMeInfo;
