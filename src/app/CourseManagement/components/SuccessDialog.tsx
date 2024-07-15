"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose,DialogFooter} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { INDIGO } from "@/lib/constants";
// import Resizer from "react-image-file-resizer";
function SuccessDialog({Open,onClose,link}:{Open:boolean,onClose:()=>void,link:string}) {
  const router=useRouter();
  const handleClick=()=>{
    onClose();
    router.push(link);
  };
  return(
    <Dialog open={Open}>
      <DialogContent hideCloseButton={true} className="shadow-2xl">
        <div className="grid justify-items-center">
          <div className="text-7xl">
            😎
          </div>
          <p className="font-bold">
            上傳成功，太讚了！
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

export default SuccessDialog;
