"use client"
import { useEffect, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { ManageIDPProps } from './dataType';
import { Button } from "@/components/ui/button"
import { ORANGE } from "@/lib/constants";

// Define the props for the action button component
interface IDPTableButtonProps {
  row: Row<ManageIDPProps>;
}

export const IDPTableEditButton: React.FC<IDPTableButtonProps> = ({ row }:IDPTableButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () =>{
    if (isMounted){
      router.push(`/MyIDP/IDP/${row.original.semester}`);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Button style={{backgroundColor:ORANGE}} 
        className="rounded-full ml-2 h-6"
        onClick={handleClick}
        disabled={!isMounted}
        >
    編輯
    </Button>
  );
};
