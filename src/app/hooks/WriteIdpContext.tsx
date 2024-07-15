"use client"
import React, { createContext, useContext, useState } from "react";
import { Section, Res } from "@/types/type";
// import { useRouter } from "next/navigation";
import useIdpProblem from "./useIdpProblem";
import useIdpStatus from "./useIdpStatus";
import useIdpResponse from "./useIdpResponse";

type WriteIdpContextType = {
  response: ResponseType,
  semester: string,
  status: string,
  data: Section[],
  loading: boolean,
  initResponseAndData: (responseId_: string) => Promise<void>,
  updateCellResponse: (cellId: string, ans: string) => void,
  handleSaveResponse: (newStatus: string) => Promise<Res>,
  // setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  // appendRow: () => Res,
};

interface ResponseType {
  [key: string]: string; // Define the structure of your response object
}

const WriteIdpContext = createContext<WriteIdpContextType|null>(null);

export const WriteIdpProvider = ({children}:{children:React.ReactNode}) => {
  const [response, setResponse] = useState<ResponseType>({});
  const [data, setData] = useState<Section[]>([]);
  const [semester, setSemester] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [responseId, setResponseId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { updateIdpResponse, getIdpResponse } = useIdpResponse();
  const { getIdpProblem } = useIdpProblem();
  const { getIdpSemesterStatus } = useIdpStatus();
  
  // const handleWidth = (d:number) => {
  //   return {ok:true,error:""};
  // }
  // const handleUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
  // }
  const initResponseAndData = async (responseId_:string) => {
    setLoading(true);
    setResponseId(responseId_)
    const response_ = await getIdpResponse(responseId_);
    const semester_ = response_.semester
    setSemester(semester_);
    setResponse(response_.response);
    setStatus(response_.status)
    const {versionId} = await getIdpSemesterStatus(semester_);
    const data_ = await getIdpProblem(versionId);
    setData(data_)
    setLoading(false);
  }
  const updateCellResponse = (cellId:string,ans:string) => {
    setResponse({
      ...response,
      [cellId]: ans
    })
  }
  const handleSaveResponse = async (newStatus?:string) => {
    try {
      await updateIdpResponse({
        displayId: responseId,
        response,
        status:newStatus
      });
    } catch (e) {
      return {ok:false,error:"saving went wrong"};
    }
    return {ok:true,error:""};
  }

  // function exportData() {
  // }

  return (
    <WriteIdpContext.Provider value={{
      response,
      semester,
      status,
      data,
      loading,
      initResponseAndData,
      updateCellResponse,
      handleSaveResponse
    }}>
      {children}
    </WriteIdpContext.Provider>
  );
}

export const useWriteIdp = () => {
  const context = useContext(WriteIdpContext);
  if (!context) {
      throw new Error('useWriteIdp must be used within a WriteIdpProvider');
  }
  return context;
};