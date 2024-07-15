"use client";
import { DataTable } from "./data-table";
import { columns } from "./Columns";
type Props={
  data: {
    id: string;
    bigCategory: string;
    middleCategory: string;
    smallCategory: string;
    course: {
      name: string;
      courseId: string;
    }[];
  }[],
};


export function SelectAndTable({
  data,
}: Props) {
  // const [editting, setEditting] = useState(false);
  // const handleSave = () => {
  //   // todo
  //   setEditting(false)
  // }
  return (
    <div className="w-5/6 h-full justify-self-center mt-2">
      {/* TODO: [I-Ning] edit courseMap on site */}
      {/* <div className="w-full relative pb-2 flex justify-end gap-2">
        { editting && <UpdateSelection data={data}/> }
        <Button className="rounded-full px-6" style={{backgroundColor:INDIGO}} onClick={()=>{setEditting(!editting)}}>
          {editting ? "完成" : "編輯"}
        </Button>
      </div> */}
      <div className="">
        <DataTable columns={columns} data={data}/>
      </div>
    </div>
  )
}
