"use client";

import { Cell } from "@/types/type";

function Text({cell,mode}:{cell:Cell,mode:string}) {
  const contentWithLineBreaks = cell.content.replace(/\n/g, '<br>');
  return(
    <a dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
      style={{fontSize:(mode==="preview") ? "14px" : cell.size}} />
  );
}

export default Text;