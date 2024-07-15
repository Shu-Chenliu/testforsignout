"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BasicButton } from "@/app/_components/BasicButton";
import { INDIGO } from "@/lib/constants";
import { MdOutlineEdit } from "react-icons/md";
import LabelText from "@/app/CourseHistory/_components/LabelText";
import Editor from "react-markdown-editor-lite";
import Markdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import useIdpResponse from "@/app/hooks/useIdpResponse";
import { useRouter } from "next/navigation";
import { Class } from "./Columns"
import { Row } from "@tanstack/react-table";

function TakeNotesDialog({row}:{row:Row<Class>}) {
    const {notes,responseDisplayId,username,semester} = row.original;
    const mdEditor = React.useRef<Editor|null>(null);
    const { updateIdpResponse } = useIdpResponse();
    const [open,setOpen] = useState(false);
    const [value, setValue] = React.useState(notes);
    const router = useRouter();

    const handleSaveNotes = async () => {
        if (!mdEditor.current) return;
        await updateIdpResponse({
          displayId: responseDisplayId,
          notes: mdEditor.current.getMdValue()
        });
        router.refresh();
        setOpen(false);
    }
  
    const handleEditorChange = ({text}:{text:string}) => {
    //   const newValue = text.replace(/\d/g, "");
      console.log(text);
      setValue(text);
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <button className="p-2 bg-slate-50 rounded-full hover:opacity-80">
                <MdOutlineEdit color={INDIGO} />
            </button>
        </DialogTrigger>
        <DialogContent className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}>
            <DialogHeader>
                <DialogTitle className="text-center">教師 IDP 筆記</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-1">
                <LabelText label="學期" text={semester} />
                <LabelText label="教師姓名" text={username??""} />
            </div>
            <Editor
                ref={mdEditor}
                value={value}
                style={{
                height: "300px"
                }}
                onChange={handleEditorChange}
                renderHTML={text => <Markdown>{text}</Markdown>}
            />
            <DialogFooter>
            <div className="items-center justify-center gap-8 flex w-full">
                <BasicButton width="100px" dark={true} text="確定儲存" onClick={handleSaveNotes} />
                <BasicButton width="100px" dark={false} text="取消" onClick={()=>{setOpen(false)}} />
            </div>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}

export default TakeNotesDialog;