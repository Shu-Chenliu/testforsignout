"use client"

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Row } from "@tanstack/react-table";
export type Class = {
    semester: string,
    username: string,
    email: string,
    mobile: string,
    school: string,
    position: string,
    subject: string,
    role: string,
    feature: string,
    authority: string,
    isEditing: boolean,
    onChange: (cell: string, content: string|boolean) => void,
    disable: boolean,
  };

export default function DisableUserCheckbox ({row}:{row:Row<Class>}){
    const [selected,setIsSelected]=useState(row.original.disable);
    const handleChange = (value:boolean) => {
        row.original.onChange("disable", value);
        setIsSelected(value);
    };
    return (
        <Checkbox
        checked={selected}
        onCheckedChange={(value:boolean) =>handleChange(value)}
        aria-label="Select row"
        className="ml-2"
        disabled={!row.original.isEditing}
        />
    );
};
