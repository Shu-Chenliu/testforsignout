"use client";
import {useEditIdpProblem} from "@/app/hooks/EditIdpProblemContext";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { INDIGO } from "@/lib/constants";
import { GrReturn, GrStarOutline } from "react-icons/gr";

function Toolbar() {
  const {appendRow,appendCol,appendSection, deleteRow,deleteCol,deleteSection,handleCheck,handleCombine,handleCopy,handlePaste,handleColor,handleWidth,handlePreviousStep,handleSimplified} = useEditIdpProblem();
  function handleRes(res:{ok:boolean,error:string}) {
    if (!res.ok) {
      alert(res.error);
    }
  }
  return(
    <Menubar className="border-0 shadow-none" style={{color: INDIGO}}>
      <MenubarMenu>
        <MenubarTrigger className="font-semibold" style={{fontSize:16}}>插入</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={()=>handleRes(appendRow())}>列</MenubarItem>
          <MenubarItem onClick={()=>handleRes(appendCol())}>欄</MenubarItem>
          <MenubarItem onClick={()=>handleRes(appendSection())}>段落</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-semibold" style={{fontSize:16}}>刪除</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={()=>handleRes(deleteRow())}>列</MenubarItem>
          <MenubarItem onClick={()=>handleRes(deleteCol())}>欄</MenubarItem>
          <MenubarItem onClick={()=>handleRes(deleteSection())}>段落</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* <MenubarMenu>
        <MenubarTrigger className="font-semibold" style={{fontSize:16}}>文字編輯</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>A+</MenubarItem>
          <MenubarItem>A-</MenubarItem>
          <MenubarItem>B</MenubarItem>
        </MenubarContent>
      </MenubarMenu> */}
      <MenubarMenu>
        <MenubarTrigger className="font-semibold" style={{fontSize:16}}>儲存格編輯</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={()=>handleRes(handleCombine())}>合併</MenubarItem>
          <MenubarItem onClick={()=>handleRes(handleWidth(5))}>+</MenubarItem>
          <MenubarItem onClick={()=>handleRes(handleWidth(-5))}>-</MenubarItem>
          <MenubarItem onClick={()=>handleRes(handleColor("dark"))}>深</MenubarItem>
          <MenubarItem onClick={()=>handleRes(handleColor("light"))}>淺</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
      <MenubarTrigger className="font-semibold" style={{fontSize:16}}>版本切換</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => handleRes(handleSimplified(true))} className="flex gap-1"><>輕量版</><GrStarOutline size={12} /></MenubarItem>
          <MenubarItem onClick={() => handleRes(handleSimplified(false))}>完整版</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-semibold" style={{fontSize:16}}>剪貼簿</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={()=>handleRes(handleCopy())}>複製</MenubarItem>
          <MenubarItem onClick={()=>handleRes(handlePaste())}>貼上</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-semibold" style={{fontSize:16}}>選取</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => handleRes(handleCheck("",-1,"all"))}>全選</MenubarItem>
          <MenubarItem onClick={() => handleRes(handleCheck("",-1,"none"))}>取消全選</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className="cursor-pointer w-8 active:bg-accent py-1.5 rounded-sm flex items-center justify-center px-1.5" 
           onClick={() => handleRes(handlePreviousStep())}>
        <GrReturn />
      </div>
    </Menubar>
  );
}

export default Toolbar;