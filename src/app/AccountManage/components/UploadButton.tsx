"use client";
import {Label} from "@/components/ui/label";
import { INDIGO} from "@/lib/constants";
import * as XLSX from "xlsx-js-style";
import useUsers from "@/app/hooks/useUsers";
import useExperience from "@/app/hooks/useExperience";
import bcrypt from "bcryptjs";
interface UserData {
  資料時間: string;
  姓名: string;
  帳號: string;
  手機: string;
  "學校/單位": string;
  校內職務:string;
  校內課程:string;
  聯盟角色:string;
  "KIST 教學特色":string;
  權限:string;
}
// interface DbData {
//   id: number; 
//   displayId: string; 
//   authority: string; 
//   email: string;
//   phoneNumber: string;
//   disable: boolean;
//   username: string
// }

// interface MergeData extends UserData, DbData {}

export default function Selection() {
  const {postUser}=useUsers();
  const {postExperience}=useExperience();
  const addUser=async(
    currentTime:string,
    username:string,
    email:string,
    phoneNumber:string,
    school:string,
    position:string,
    subject:string,
    role:string,
    feature:string,
    authority:string )=>{
    const pswd=await bcrypt.hash(phoneNumber, 10);
    await postUser({
      username,
      email,
      phoneNumber,
      hashedPassword:pswd,
      authority,
    });

    // TODO: handle experience
    // NOTE: (see slides p41 comments)
    await postExperience({ // this is the case only for first-exist users
      email,
      semester: currentTime,
      school, position, subject, role, feature
    })
  }
  const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>) => {
    // const dbUserData = await getUser();
    // const dbExperienceData = await getExperience();
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files![0]);
    reader.onload = (e) => {
      const data = e.target!.result;
      const workbook = XLSX.read(data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const dataHeader = dataArr[0] as string[];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: dataHeader }).slice(1) as UserData[];
      // // if (email in dbData, not in parsedData)
      // // do
      // //   disable dbData(email)
      // // done
      // const difference1 = dbUserData.filter((obj1: DbData) => 
      //   !parsedData.some(obj2 => 
      //     obj1.email === obj2.帳號 
      //   )
      // );
      // difference1.forEach(async (d: DbData) => await updateUser({id: d.displayId, disable:true}))
      // // else if (email in parsedData, not in dbData)
      // // do
      // //   addUser(email)
      // //   addExperience(email)
      // // done
      // const difference2 = parsedData.filter(obj1 => 
      //   !dbUserData.some((obj2: DbData) => 
      //     obj1.帳號 === obj2.email 
      //   )
      // );
      // difference2.forEach( async (d) => { 
      //     await postUser({
      //       username: d.姓名,
      //       email: d.帳號,
      //       phoneNumber: d.手機,
      //       hashedPassword: await bcrypt.hash(d.手機, 10),
      //       authority: d.權限,
      //     })
      //     await postExperience({
      //       email: d.帳號,
      //       semester: d.資料時間,
      //       school: d["學校/單位"],
      //       position: d.校內職務,
      //       subject: d.校內課程,
      //       role: d.聯盟角色,
      //       feature: d["KIST 教學特色"]
      //     })
      //   }
      // )
      // // else if (email in both)
      // // do
      // //   updateUser(email)
      // //   updateExperience(email)
      // // done
      // const mergedData = dbUserData.reduce((acc: MergeData[], dbObj: DbData) => {
      //   const matchingParsedObj = parsedData.find(parsedObj => dbObj.email === parsedObj.帳號);
      //   if (matchingParsedObj) {
      //     acc.push({ ...dbObj, ...matchingParsedObj });
      //   }
      //   return acc;
      // }, []);

      // mergedData.forEach( async (d:MergeData) => { 
      //   await updateUser({
      //     id: d.displayId,
      //     mobile: d.手機,
      //     authority: d.權限,
      //     disable: false,
      //   })
      //   // await postExperience({
      //   //   userId: d.displayId,
      //   //   start: d.資料時間,
      //   //   end: d.資料時間,
      //   //   school: d["學校/單位"],
      //   //   position: d.校內職務,
      //   //   subject: d.校內課程,
      //   //   role: d.聯盟角色,
      //   //   feature: d["KIST 教學特色"]
      //   // })
      // }
      // )

      parsedData.slice(1).forEach((d: UserData) => {
        // const authority=d.身分==="校長"?"B":d.身分==="主任"?"C":"D";
        try {
            addUser(
            d.資料時間??"",
            d.姓名??"",
            d.帳號??"",
            d.手機??"",
            d["學校/單位"]??"",
            d.校內職務??"",
            d.校內課程??"",
            d.聯盟角色??"",
            d["KIST 教學特色"]??"",
            d.權限??"",
          );
        } catch (e) {
          console.log(d.姓名+": something goes wrong (user may already exist)")
          return
        }
      });
      console.log("uploaded successfully")
    };
  }
  return (
    <>
      <Label className="grid rounded-full h-8 items-center w-1/3 justify-items-center" style={{backgroundColor:INDIGO}}>
        <div className="text-white">
          批次建立帳號
        </div> 
        {/* TODO: show selected files */}
        <div style={{ display: 'none', }}>
          <input 
            type="file"
            onChange={handleUpload}
          />
        </div>
      </Label>
    </>
  )
}
