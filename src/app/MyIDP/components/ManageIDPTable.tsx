"use client";
import { manageColumns } from "./Columns";
import { DataTable } from "./data-table";
import { ManageIDPProps } from './dataType';

interface ManageIDPTableProps {
  data: ManageIDPProps[];
  setData: React.Dispatch<React.SetStateAction<ManageIDPProps[]>>;
}

export function ManageIDPDataTable({data}:ManageIDPTableProps){
  return(
    <>
      <div className="w-5/6 h-full justify-self-center mt-2">
        <DataTable columns={manageColumns} data={data}/>
      </div>
    </>
  );
}