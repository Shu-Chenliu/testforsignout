"use client";
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import { MyIDPProps } from './dataType';

interface MyIDPTableProps {
  data: MyIDPProps[];
}

export default function SelectAndData({data}:MyIDPTableProps){
  return(
    <>
      {/* <div className="flex justify-center gap-1">
        <BasicButton dark={true} text={"查看歷史IDP統整資料"} href="/MyIDPReport" />
      </div> */}
      <div className="w-5/6 h-full justify-self-center mt-8">
        <DataTable columns={columns} data={data}/>
      </div>
    </>
  );
}