"use client";
import {Button} from "@/components/ui/button";
import{useRef}from "react";
import useUsers from "@/app/hooks/useUsers";
import { useToast } from '@/components/ui/use-toast';
import { INDIGO } from "@/lib/constants";
// note that the Tweet component is also a server component
// all client side things are abstracted away in other components

type Props = {
  userId:string,
};

export default function AddImageButton({userId}:Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  // const [imageSrc,setImageSrc]=useState("");
  const {updateUser}=useUsers();
  const {toast}=useToast();
  const handleUploadImage=async()=>{
    if(!imageRef.current)return;
    if(!imageRef.current.files)return;
    const reader = new FileReader();
    let imageSrc="";
    try {
      if (imageRef.current.files[0].size/1024 > 70) {
        // alert("Image size must be less than 70KB");
        toast({
          variant: "destructive",
          // title: " Fail to Upload",
          description: "Image size must be less than 70KB",
        })
        throw new Error();
      }
      reader.onload = async function (e) {
        if(typeof e.target?.result==="string"){
          imageSrc=e.target.result;
          await updateUser({
            id:userId,
            imageURL:imageSrc,
          });
        } 
      };
      reader.readAsDataURL(imageRef.current.files[0]);
    }
    catch {
      // alert("Failed to upload image");
      toast({
        variant: "destructive",
        // title: " Fail to Add Product",
        description: "Failed to upload image",
      })
      imageRef.current.value = "";
      return;
    }
    imageRef.current.value = "";
  }
  
  return (
    <>
      <div className='grid justify-center'>
        <div id="image-box" className="justify-self-center w-1/2">
          <input 
            type="file" 
            accept="image/*"
            id="upload-image"
            ref={imageRef}
          />
        </div>
        <Button
          onClick={handleUploadImage}
          className="w-1/2 hover:opacity-80 justify-self-center mt-2" 
          style={{backgroundColor: INDIGO}}
        >
          上傳照片
        </Button>
      </div>
    </>
  );
}