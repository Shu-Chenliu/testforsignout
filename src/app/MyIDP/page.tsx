"use client"
import SelectAndData from "./components/SelectAndTable";
import {ManageIDPDataTable} from "./components/ManageIDPTable";
import {MyIDPProps, ManageIDPProps} from "./components/dataType";
import useIdpStatus from "../hooks/useIdpStatus";
import useIdpResponse from "../hooks/useIdpResponse";
// import { useRouter } from "next/navigation";
import useIdpProblem from "@/app/hooks/useIdpProblem";
// import useUsers from "../hooks/useUsers";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { ADMIN, INDIGO } from "@/lib/constants";
import { BasicButton } from "../_components/BasicButton";
import { MdRemoveRedEye } from "react-icons/md";

export default function MyLectureHistory(){
  const [data, setData] = useState<MyIDPProps[]>([]);
  const [backendData, setBackendData] = useState<ManageIDPProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { postNewSemesterStatus, getIdpStatus } = useIdpStatus();
  const { getSemesterIdpResponse, getIdpResponseByEmail } = useIdpResponse();
  const { postNewIdpVersion, getIdpVersions } = useIdpProblem();
  const { data: session } = useSession();
  console.log(session);
  const authority = session?.user?.authority;
  const email = session?.user?.email;

  const handleNewSemesterIDP = async () => {
    let maxYear = 0;
    let maxSemester = 0;
    for (const entry of backendData) {
        const [year, semester] = entry.semester.split('-').map(Number);

        if (year > maxYear) {
            maxYear = year;
            maxSemester = semester; // Reset maxSemester because we found a new maxYear
        } else if (year === maxYear) {
            if (semester > maxSemester) {
                maxSemester = semester;
            }
        }
    }
    console.log(maxYear)
    if (maxYear === 0) {
      const currentDate = new Date();
      maxYear = currentDate.getFullYear()-1911;
      maxSemester = 1
    }
    else if (maxSemester===2){
      maxSemester = 1
      maxYear+=1
    }
    else {
      maxSemester+=1
    }
    const versions = await getIdpVersions();
    const latestVersion = versions.length > 0 ? versions[versions.length-1].versionId : 0;
    console.log(latestVersion);
    if (latestVersion === 0) {
      await postNewIdpVersion({
        data: []
      });
    }
    await postNewSemesterStatus({
      semester: `${maxYear}-${maxSemester}`,
      idpVersion: latestVersion==0 ? 1 : latestVersion,
      updateTime: new Date().toLocaleString(),
      released: false,
    });
    setBackendData([...backendData, {
      semester: `${maxYear}-${maxSemester}`, 
      versionId: latestVersion==0 ? 1 : latestVersion, 
      updateTime: new Date().toLocaleString(),
      released: false,
      note: '0 / 0',
    }]);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authority === ADMIN){
          const backendResult = await getIdpStatus();
          for (let i = 0; i < backendResult.length; i++) {
            const semester = backendResult[i].semester;
            const semesterResults = await getSemesterIdpResponse(semester);
            let count = 0;
            for (let i = 0; i < semesterResults.length; i++) {
              if (semesterResults[i].status === 'c') {
                count++;
              }
            }
            backendResult[i].note = `${count} / ${semesterResults.length.toString()}`
          }
          setBackendData(backendResult);
        }
        else if (email) {
          // const result = getTeacherData("甲老師");
          const result = await getIdpResponseByEmail(email);
          setData(result);
          console.log(result)
        }
        else {
          console.log("email")
          console.log(email)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]); 

  if (loading) return <div>Loading...</div>;

  if (authority && authority != ADMIN){
    return(
      <div className="grid h-full p-16">
        <div className="grid justify-center mt-14 gap-3">
          <p className="text-3xl text-[#013E6E] text-center">我的IDP</p>
          <BasicButton href="/IDPRecords" dark={false} text="查看我的歷史 IDP" width="180px" element={<MdRemoveRedEye color={INDIGO} />} />
        </div>
        <SelectAndData data={data}/>
      </div>
    );
  }
  else if (authority== ADMIN){
    return(
      <div className="grid h-full p-16">
        <div className="grid justify-center mt-14 mb-5">
          <p className="text-3xl text-[#013E6E]">管理IDP</p>
        </div>
        <div className="flex w-5/6 justify-self-center">
          <button className="border-2 ml-auto rounded-full px-2" onClick={()=>{handleNewSemesterIDP()}}>新增</button>
        </div>
        <ManageIDPDataTable data={backendData} setData={setBackendData}/>
      </div>
    );
  }
}