"use client"
import { useState, useEffect, useRef } from "react";
import { RelationType } from "./NestedSelect";

interface SingleSelectProps {
  optionTexts: string[];
  relations: RelationType[];
  options: RelationType[];
  value: number | null;
  onChange: (value: number) => void;
  mode: string;
  width: number;
}

export default function SingleSelect({ optionTexts, relations, options, value, onChange, mode, width }: SingleSelectProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(value);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (newValue: number) => {
    setSelectedValue(newValue);
    onChange(newValue);
    setIsOpen(false);
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

  return (
    <div className="flex">
        <div className="bg-white rounded relative border" ref={selectRef}>
            <div 
                onClick={() => setIsOpen(mode==="preview"?false:!isOpen)} 
                className="px-1 h-8 py-1 rounded-md cursor-pointer flex items-center"
                style={{ fontSize: value===null?((mode === "preview") ? "12px" : 12):((mode === "preview") ? "14px" : "14px"),
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width:width,
                color:value!==null?"black":"grey",
                cursor: mode==="preview"?"default":"pointer"
                }}
            >
                {selectedValue === null ? "尚未選擇": optionTexts[relations[selectedValue].option]}
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-60 overflow-y-auto">
                    {options.map((option: RelationType, i: number) => (
                        <div 
                        key={"option" + i} 
                        onClick={() => handleChange(option.id)}
                        className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                        >
                        {optionTexts[option.option]}
                        </div>
                    ))}
                </div>
            )}
        </div>
        {/* <div>{JSON.stringify(optionTexts[options[0].option])}</div>
        <div>{JSON.stringify(value===undefined)}</div>
        <div>{JSON.stringify(null)}</div> */}
    </div>
  );
}
