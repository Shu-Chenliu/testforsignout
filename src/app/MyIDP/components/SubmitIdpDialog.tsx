"use client";
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BasicButton } from "@/app/_components/BasicButton";
import { useWriteIdp } from "@/app/hooks/WriteIdpContext";
import { DARK_BLUE, INDIGO } from "@/lib/constants";
import IDPResponseTable from "./IDPResponseTable";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  simplifiedVersion: boolean;
};

function SubmitIdpDialog({open,setOpen,simplifiedVersion}:Props) {
  const { handleSaveResponse, semester, data, response } = useWriteIdp();
  const { data: session } = useSession();
  const username = session?.user?.username;
  const handleUpdateResponse = async () => {
    handleSaveResponse("c");
    setOpen(false);
  }
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
        pdf.save(`${semester} ${username}個人發展計畫`);
        handelSaveAndNavigate();
      });
    }
  }

  const handelSaveAndNavigate = () => {
    handleUpdateResponse();
    setOpen(false);
    router.push(`/MyIDP/`);
  }
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="py-3 flex justify-center">
          <BasicButton text="送出" dark={true} width="80px" onClick={()=>{setOpen(true)}} />
        </div>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
        <DialogHeader>
          <DialogTitle className="text-center">預覽頁面</DialogTitle>
        </DialogHeader>
        <div className="items-center flex-col justify-center h-fit">
          <div className="font-bold text-center" style={{color:INDIGO}}>個人發展計畫 IDP</div>
        </div>
        <div ref={contentRef}>
          <IDPResponseTable mode={"preview"} simplifiedVersion={simplifiedVersion} data={data} response={response} />
        </div>
        <DialogFooter>
          <div className="items-center justify-center gap-8 flex w-full" style={{color:DARK_BLUE}}>
            <div className="cursor-pointer" onClick={()=>{setOpen(false)}}>返回編輯</div>
            <div className="underline cursor-pointer" onClick={()=>{handelSaveAndNavigate()}}>完成</div>
            <div className="underline cursor-pointer" onClick={()=>{handleExportToPDF()}}>完成並匯出PDF</div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitIdpDialog;