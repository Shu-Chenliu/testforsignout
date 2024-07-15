"use client"
import { Row } from '@tanstack/react-table';
import { ColumnDef } from "@tanstack/react-table";
import EditingInput from "./EditingInput";
import { useState, ChangeEvent } from "react";
import DisableUserCheckbox from './DisableUserCheckbox';
type EditableKeys = 'school' | 'position' | 'subject' | 'role' | 'feature' | 'authority';
// Define the shape of our data.
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

const ControlledInput = ({ row, cellKey }: { row: Row<Class>, cellKey: EditableKeys }) => {

  const [content, setContent] = useState(row.original[cellKey]||"");
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    row.original.onChange(cellKey, newValue);
    setContent(newValue);
  };

  return row.original.isEditing ? (
    <EditingInput value={content} handleChange={handleChange} />
  ) : (
    <p>{content}</p>
  );
};

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "semester",
    header: "期間",
  },
  {
    accessorKey: "username",
    header: "姓名",
  },
  {
    accessorKey: "email",
    header: "帳號",
  },
  {
    accessorKey: "mobile",
    header: "手機",
  },
  {
    accessorKey: "school",
    header: "學校/單位",
    cell: ({ row }) => <ControlledInput row={row} cellKey="school" />,
  },
  {
    accessorKey: "position",
    header: "校內職務",
    cell: ({ row }) => <ControlledInput row={row} cellKey="position" />,
  },
  {
    accessorKey: "subject",
    header: "校內課程",
    cell: ({ row }) => <ControlledInput row={row} cellKey="subject" />,
  },
  {
    accessorKey: "role",
    header: "聯盟角色",
    cell: ({ row }) => <ControlledInput row={row} cellKey="role" />,
  },
  {
    accessorKey: "feature",
    header: "KIST教學特色",
    cell: ({ row }) => <ControlledInput row={row} cellKey="feature" />,
  },
  {
    accessorKey: "authority",
    header: "權限",
    cell: ({ row }) => <ControlledInput row={row} cellKey="authority" />,
  },
  {
    id: "select",
    header: "停用",
    cell: ({ row }) => {
      return (
        <DisableUserCheckbox row={row} />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
