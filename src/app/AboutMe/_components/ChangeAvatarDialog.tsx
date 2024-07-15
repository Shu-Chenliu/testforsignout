"use client";
import React from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import { useState } from "react";
import UserAvatar from "@/app/_components/UserAvatar";
import{useRef}from "react";
import useUsers from "@/app/hooks/useUsers";
import { useToast } from '@/components/ui/use-toast';
import { BasicButton } from "@/app/_components/BasicButton";
import Image from "next/image"
type Props={
  imageURL: string;
  userId: string;
}
// eslint-disable-next-line
export default function ChangeAvatarDialog({imageURL,userId}:Props) {  
  const [open, setOpen] = useState(false);
  const [newURL, setNewURL] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const {updateUser}=useUsers();
  const {toast}=useToast();

  const handleUploadImage=async()=>{
    if(!imageRef.current)return;
    if(!imageRef.current.files)return;
    const reader = new FileReader();
    let imageSrc="";
    try {
      if (imageRef.current.files[0].size/1024 > 70) {
        toast({
          variant: "destructive",
          // title: " Fail to Upload",
          description: "Image size must be less than 70KB",
        })
        return;
      }
      reader.onload = async function (e) {
        if(typeof e.target?.result==="string"){
          imageSrc=e.target.result;
          setNewURL(imageSrc);
        } 
      };
      reader.readAsDataURL(imageRef.current.files[0]);
    }
    catch {
      toast({
        variant: "destructive",
        description: "Failed to upload image",
      })
      imageRef.current.value = "";
      return;
    }
    imageRef.current.value = "";
  }
  const handleUpdateImage = async () => {
    try {
      await updateUser({
        id:userId,
        imageURL:newURL,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Failed to update image",
      })
      setNewURL("");
      return;      
    }
    handleCloseDialog();
  }
  const handleCloseDialog = () => {
    setNewURL("");
    setOpen(false);
  }
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer w-fit h-fit rounded-full">
          <UserAvatar 
            size={208} 
            imageURL={imageURL}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">上傳照片</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-5 justify-center items-center'>
          <div className="w-4/5 h-52 flex justify-center">
            {newURL==="" ? <Label className="flex-col flex w-full h-full rounded-3xl items-center justify-center border-2 border-dashed border-slate-200">
              <div className="text-slate-300 text-base">
                添加照片
              </div> 
              {/* TODO: show selected files */}
              <div style={{ display: 'none', }}>
                <input 
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  ref={imageRef}
                  onChange={handleUploadImage}
                />
              </div>
            </Label> : <Image
              width={208}
              height={208}
              alt="avatar"
              src={newURL}
              className="rounded-full"
            />}
          </div>
          {newURL!=="" && <div className="flex gap-3 w-full justify-center">
            <BasicButton dark={true} text="確定上傳" onClick={handleUpdateImage} />
            <BasicButton dark={false} text="取消" onClick={handleCloseDialog} />
          </div>}
        </div>
        <DialogClose asChild>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}