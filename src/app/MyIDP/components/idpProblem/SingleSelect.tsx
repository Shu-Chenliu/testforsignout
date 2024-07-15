"use client";

import { Cell } from "@/types/type";
import { useEffect, useState, useRef } from "react";

type Props = {
  cell: Cell,
  mode: string,
  response?: string,
  updateCellResponse?: (cellId: string, ans: string) => void
};

function CustomSelect({ cell, mode, response, updateCellResponse }: Props) {
  const options = cell.content ? JSON.parse(cell.content) : [];
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(options[0]);
    if (mode === "write" || mode === "preview") {
      setValue(response??"");
    }
  }, [cell.content, mode]);

  const handleChange = (opt: string) => {
    setValue(opt);
    setIsOpen(false);
    if (mode === "write" && updateCellResponse) {
      if (!opt) return;
      updateCellResponse(cell.id, opt);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (selectRef.current) {
      const { width } = selectRef.current.getBoundingClientRect();
      setWidth(width);
    }
  }, []);
  return (
    <>
      {options.length > 0 && 
        <div className="flex w-full">
          <div className="flex-grow bg-white rounded relative border" ref={selectRef}>
            <div 
              onClick={() => setIsOpen(mode==="preview"?false:!isOpen)} 
              className="px-1 h-8 py-1 rounded-md cursor-pointer flex items-center"
              style={{ fontSize: value?((mode === "preview") ? "14px" : cell.size):((mode === "preview") ? "12px" : cell.size-2),
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width:width,
                color:value?"black":"grey",
                cursor: mode==="preview"?"default":"pointer"
              }}
            >
              {value?value:"尚未選擇"}
            </div>
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-60 overflow-y-auto">
                {options.map((option: string, i: number) => (
                  <div 
                    key={"option" + i} 
                    onClick={() => handleChange(option)}
                    className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
}

export default CustomSelect;
