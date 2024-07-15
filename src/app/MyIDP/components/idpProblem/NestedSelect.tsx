"use client"
import { Cell } from "@/types/type";
import { useEffect, useState } from "react";
import Select from "./Select";
import MultiSelect from "./MultiSelect";

export interface RelationType {
  id: number;
  parent: number|null;
  option: number;
}

export interface OptionsDataType {
  depth: number;
  widths: number[];
  options: string[];
  relations: RelationType[];
}

type Props = {
  cell: Cell;
  mode: string;
  response?: string;
  multiSelect?: boolean;
  updateCellResponse?: (cellId: string, ans: string) => void;
};

export default function NestedSelect({ cell, mode, response, multiSelect, updateCellResponse }: Props) {
  const [optionsData, setOptionsData] = useState<OptionsDataType>();
  const [selectedOptions, setSelectedOptions] = useState<(null | number)[]>([]);
  const [multiSelectedOptions, setMultiSelectedOptions] = useState<number[]>([]);
  const [availableOptions, setAvailableOptions] = useState<RelationType[][]>([]);

  useEffect(() => {
    const optionsData_: OptionsDataType = JSON.parse(cell.content);
    const depth = optionsData_.depth;
    setOptionsData(optionsData_);
    setSelectedOptions(Array(depth - (multiSelect ? 1 : 0)).fill(null));
    setMultiSelectedOptions([]);
    setAvailableOptions([optionsData_.relations.filter((rel) => rel.parent === null)]);
    if ((mode === "write" || mode === "preview") && response) {
      const response_ = JSON.parse(response);
      const singleSelectResponse = response_.slice(0, depth - (multiSelect ? 1 : 0));
      const multiSelectResponse = multiSelect ? response_[depth - 1] : [];
    
      setSelectedOptions(singleSelectResponse);
      setMultiSelectedOptions(multiSelectResponse);
    
      const filtersArray = [];
      filtersArray.push(optionsData_.relations.filter((rel: RelationType) => rel.parent === null));
    
      if (depth > 1) {
        for (let i = 0; i < depth - 2; i++) {
          filtersArray.push(
            optionsData_.relations.filter(
              (rel: RelationType) =>
                rel.parent !== null &&
                rel.parent === singleSelectResponse[i] &&
                optionsData_.relations[rel.parent].parent === (i === 0 ? null : singleSelectResponse[i - 1])
            )
          );
        }
    
        if (multiSelect) {
          // Last level is multi-select
          filtersArray.push(
            optionsData_.relations.filter(
              (rel: RelationType) =>
                rel.parent !== null &&
                rel.parent === singleSelectResponse[depth - 2] &&
                optionsData_.relations[rel.parent].parent === (depth === 2 ? null : singleSelectResponse[depth - 3])
            )
          );
        } else {
          // Last level is single-select
          // if (singleSelectResponse[depth - 2] === response_[depth - 3]) {
          filtersArray.push(
            optionsData_.relations.filter(
              (rel: RelationType) =>
                rel.parent !== null &&
                rel.parent === singleSelectResponse[depth - 2] &&
                optionsData_.relations[rel.parent].parent === (depth === 2 ? null : singleSelectResponse[depth - 3])
            )
          );
          // } else {
          //   filtersArray.push([]);
          // }
        }
      }
      setAvailableOptions(filtersArray);
    }
  }, [cell.content, mode]);

  const handleChange = (level: number, selectedId: number) => {
    if (!selectedOptions || !optionsData || selectedId===selectedOptions[level]) return;
    const newSelectedOptions = selectedOptions.map((selected, i) => (i >= level ? (i === level ? selectedId : null) : selected));
    if (multiSelect) setMultiSelectedOptions([]);
    setSelectedOptions(newSelectedOptions);
    const newAvailableOptions = [...availableOptions.slice(0, level + 1)];
    if (level !== optionsData.depth - 1) newAvailableOptions.push(optionsData.relations.filter((rel) => rel.parent === selectedId && optionsData.relations[rel.parent].parent === (level === 0 ? null : selectedOptions[level - 1])));
    setAvailableOptions(newAvailableOptions);
    if (mode === "write" && updateCellResponse) {
      if (!selectedOptions) return;
      updateCellResponse(cell.id, JSON.stringify([...newSelectedOptions, multiSelect?[]:multiSelectedOptions]));
    }
  };

  const handleMultiChange = (selectedIds: number[]) => {
    if (!selectedOptions || !optionsData) return;
    setMultiSelectedOptions(selectedIds);
    if (mode === "write" && updateCellResponse) {
      if (!selectedOptions) return;
      updateCellResponse(cell.id, JSON.stringify([...selectedOptions, selectedIds]));
    }
  };

  return (
    <div className="flex gap-2">
      {optionsData &&
        Array.from({ length: optionsData.depth }).map((_, level: number) => (
          (multiSelect && level === optionsData.depth - 1) ? (
            <MultiSelect
              mode={mode}
              key={level}
              options={availableOptions[level] || []}
              values={multiSelectedOptions}
              onChange={handleMultiChange}
              width={optionsData.widths[level]}
              relations={optionsData.relations}
              optionTexts={optionsData.options}
            />
          ) : (
            <Select
              mode={mode}
              key={level}
              options={availableOptions[level] || []}
              value={selectedOptions[level]}
              onChange={(value) => handleChange(level, value)}
              width={optionsData.widths[level]}
              relations={optionsData.relations}
              optionTexts={optionsData.options}
            />
          )
        ))}
      {/* <div>
        <div>{JSON.stringify(optionsData)}</div>
        <div>{JSON.stringify(availableOptions)}</div>
        <div>{JSON.stringify(selectedOptions)}</div>
        <div>{JSON.stringify(multiSelectedOptions)}</div>
        <div>{JSON.stringify(multiSelect)}</div>
      </div> */}
    </div>
  );
}
