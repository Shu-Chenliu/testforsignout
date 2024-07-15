"use client"
import { useEffect, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { MyIDPProps } from './dataType';
import { Button } from "@/components/ui/button"
import { GREEN, INDIGO, ORANGE } from "@/lib/constants";

// Define the props for the action button component
interface IDPTableButtonProps {
  row: Row<MyIDPProps>;
}

export const IDPTableWriteIdpButton: React.FC<IDPTableButtonProps> = ({row}:IDPTableButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () =>{
    if (isMounted){
      router.push(`/MyIDP/${row.original.displayId}`);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Button style={{backgroundColor:
      row.original.status == 'a' ? ORANGE
      :row.original.status == 'b' ? GREEN
      :INDIGO
    }} 
      className="rounded-full ml-2 h-6"
      onClick={handleClick}
    >
      {row.original.status == 'a' ? "填寫"
        :row.original.status == 'b' ? "編輯"
        :"查看"
      }
    </Button>
  );
};
