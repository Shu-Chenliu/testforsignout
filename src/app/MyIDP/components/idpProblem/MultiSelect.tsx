"use client"
import { useState, useEffect, useRef } from "react";
import { RelationType } from "./NestedSelect";

interface MultiSelectProps {
  optionTexts: string[];
  relations: RelationType[];
  options: RelationType[];
  values: number[] | null;
  onChange: (value: number[]) => void;
  mode: string;
  width: number;
}

export default function MultiSelect({ optionTexts, relations, options, values, onChange, mode, width }: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<number[]>(values || []);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValues(values || []);
  }, [values]);

  const handleChange = (newValue: number) => {
    let newSelectedValues: number[];
    if (selectedValues.includes(newValue)) {
      newSelectedValues = selectedValues.filter(val => val !== newValue);
    } else {
      newSelectedValues = [...selectedValues, newValue];
    }
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
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
          style={{ fontSize: selectedValues.length > 0 ? ((mode === "preview") ? "14px" : "14px") : ((mode === "preview") ? "12px" : 12),
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width:width,
          color: selectedValues.length > 0 ? "black" : "grey",
          cursor: mode==="preview"?"default":"pointer"
          }}
        >
          {selectedValues.length > 0 ? selectedValues.map(val => optionTexts[relations[val].option]).join(", ") : "尚未選擇"}
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-60 overflow-y-auto">
            {options.map((option: RelationType, i: number) => (
              <div 
                key={"option" + i} 
                onClick={() => handleChange(option.id)}
                className={`px-2 py-1 cursor-pointer hover:bg-gray-200 ${selectedValues.includes(option.id) ? "bg-gray-200" : ""}`}
              >
                {optionTexts[option.option]}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <>{JSON.stringify(selectedValues)}</> */}
      {/* <>{selectedValues.length>=1 && JSON.stringify(optionTexts[relations[selectedValues[0]].option])}</> */}
    </div>
  );
}
