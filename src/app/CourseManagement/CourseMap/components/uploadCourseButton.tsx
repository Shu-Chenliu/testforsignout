"use client";
import {Label} from "@/components/ui/label";
import { INDIGO} from "@/lib/constants";
import * as XLSX from "xlsx-js-style";
import useMap from "@/app/hooks/useMap";
interface MapData {
  ID:string;
  能力:string;
  類別:string;
  進程:string;
  "必/選修":string;
  適用對象:string;
}
export default function UploadCourseButton() {
  const {postMap}=useMap();
  const addMap=async(id:string,bigCategory:string,middleCategory:string,smallCategory:string,required:boolean,applicable:string)=>{
    await postMap({
      id,
      bigCategory,
      middleCategory,
      smallCategory,
      required,
      applicable,
    })
  }
  const handleUpload = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files![0]);
    reader.onload = (e) => {
      const data = e.target!.result;
      const workbook = XLSX.read(data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const dataHeader = dataArr[0] as string[];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: dataHeader }) as MapData[];
      parsedData.slice(1).forEach((d: MapData) => {
        console.log(d.ID);
        addMap(
          d.ID.toString(),
          d.能力,
          d.類別,
          d.進程,
          d["必/選修"]==="必修",
          d.適用對象,
        );
      });
    };
  }
  return (
    <>
      <Label className="grid rounded-full h-8 items-center justify-items-center mt-2" style={{backgroundColor:INDIGO}}>
        <div className="text-white">
          匯入課程地圖
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
