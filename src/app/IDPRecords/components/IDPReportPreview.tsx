"use client";
import {Dialog,DialogTrigger,DialogContent,DialogHeader, DialogFooter} from "@/components/ui/dialog";
import { DARK_BLUE, INDIGO } from "@/lib/constants";
import IDPResponseTable from "@/app/MyIDP/components/IDPResponseTable";
import { MdRemoveRedEye } from "react-icons/md";
import { ResponseType } from "@/types/type";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Row } from "@tanstack/react-table";
import { Class } from "./Columns"
function IDPReportPreview({row}:{row:Row<Class>}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const handleExportToPDF = () => {
    const input = contentRef.current;
    if (input) {
      html2canvas(input).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        // pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${row.original.semester}`);
      });
    }
  }
  return(
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 bg-slate-50 rounded-full hover:opacity-80">
          <MdRemoveRedEye color={INDIGO} />
        </button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen grid shadow-2xl justify-items-center"}>
        <DialogHeader>
          <p className="font-bold">個人發展計畫 IDP</p>
        </DialogHeader>
        <div className="items-center flex-col justify-center h-fit">
          <div className="font-bold text-center">{`${row.original.semester} ${row.original.username}`}</div>
        </div>
        <div className="overflow-auto w-full">
          {/* <div>{JSON.stringify(row.original.response)}</div> */}
          <div ref={contentRef}>
            <IDPResponseTable mode={"preview"} simplifiedVersion={false} data={row.original.data} response={row.original.response as ResponseType} />
          </div>
        </div>
        <DialogFooter>
          <div className="items-center justify-center gap-8 flex w-full" style={{color:DARK_BLUE}}>
            <div className="underline cursor-pointer" onClick={()=>{handleExportToPDF()}}>匯出PDF</div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default IDPReportPreview;