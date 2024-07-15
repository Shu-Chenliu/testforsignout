import React from "react";
import { INDIGO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
function Bottombar() {
  return (
    <>
      <nav className="fixed bottom-0 w-full h-12 mx-4">
        <Separator className="w-full" />
        <div className="flex justify-end mr-6 pt-1">
          <Button
            style={{ 
              backgroundColor:"white",
              boxShadow:"none",
              color:INDIGO,
            }}
            className=""
          >
            <a href="https://docs.google.com/document/d/1_VTtYwjhO20ZlA8Wvp8aQPZhXjYhAxBFTsgIPfsTAPQ/" rel="noopener noreferrer" target="_blank">
              查看操作手冊
            </a>
          </Button>
          <Button
            style={{ 
              backgroundColor:"white",
              boxShadow:"none",
              color:INDIGO,
            }}
            className=""
          >
            <a href="https://docs.google.com/document/d/11KO_bzcrAci17EQuLdWby3AuMHK6qaBWzWvYJN8y-14/edit" rel="noopener noreferrer" target="_blank">
              查看隱私管理辦法
            </a>
          </Button>
        </div>
      </nav>
      
    </>
  );
}

export default Bottombar;
