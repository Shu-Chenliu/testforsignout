"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { INDIGO, LIGHT_BLUE } from "@/lib/constants";

function ViewMore({more,color}:{more:string,color:string}) {
  const contentWithLineBreaks = more.replace(/\n/g, '<br>');
  return(
    <div className="flex gap-1 items-center"> 
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="text-xs underline pl-1 pt-1 text-nowrap" style={{color:color==="dark"?LIGHT_BLUE:INDIGO}}>更多</TooltipTrigger>
          <TooltipContent className="bg-white opacity-95 border-2 text-current w-fit overflow-y-auto h-fit max-h-32 max-w-screen" style={{color:"black"}}>
            <a dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default ViewMore;