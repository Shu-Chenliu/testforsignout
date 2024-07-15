"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose,DialogFooter} from "@/components/ui/dialog";
// import { useRouter } from "next/navigation";
import { INDIGO } from "@/lib/constants";
// import Resizer from "react-image-file-resizer";
function FailDialog({Open,onClose,link}:{Open:boolean,onClose:()=>void,link:string}) {
  // const router=useRouter();
  const href=
    link==="建立課程清單模板"?"https://docs.google.com/spreadsheets/d/1GFwAR0ad5mAWKT-HkwNrvKWCspIATYD32EwC_olwrxs/edit?gid=288357135#gid=288357135":
    link==="教師選課結果模板"?"https://docs.google.com/spreadsheets/d/1GFwAR0ad5mAWKT-HkwNrvKWCspIATYD32EwC_olwrxs/edit?gid=584150318#gid=584150318":
    link==="單堂課程回饋模板"?"https://docs.google.com/spreadsheets/d/1GFwAR0ad5mAWKT-HkwNrvKWCspIATYD32EwC_olwrxs/edit?gid=673388009#gid=673388009":""
  const handleClick=()=>{
    onClose();
  };
  return(
    <Dialog open={Open}>
      <DialogContent hideCloseButton={true} className="shadow-2xl">
        <div className="grid justify-items-center">
          <div className="text-7xl">
            ⚠️
          </div>
          <p className="font-bold">
            似乎不太順利，再檢查一次
          </p>
          <p>
            請參考
            {<a 
              href={href}
              className="text-sky-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>}
            製作
          </p>
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" onClick={handleClick} style={{backgroundColor:INDIGO}}>
              確認
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FailDialog;
