"use client"
import { useEffect, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { ManageIDPProps } from './dataType';
import { Button } from "@/components/ui/button"
import { ORANGE } from "@/lib/constants";
import useIdpStatus  from "@/app/hooks/useIdpStatus";
import useUsers from '@/app/hooks/useUsers';
import useIdpResponse from '@/app/hooks/useIdpResponse';

// Define the props for the action button component
interface IDPTableButtonProps {
  row: Row<ManageIDPProps>;
}

export const IDPTablePublishButton: React.FC<IDPTableButtonProps> = ({ row }:IDPTableButtonProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPublished, setIsPublished] = useState(row.original.released);
  const { updateIdpStatus } = useIdpStatus();
  const { getUser} = useUsers();
  const { postIdpResponse, getSemesterIdpResponse } = useIdpResponse();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = async (row: { semester: string; updateTime: string; idpVersion?: number | undefined; released?: boolean | undefined; }) => {
    await updateIdpStatus({
      semester: row.semester,
      updateTime: new Date().toLocaleTimeString(),
      idpVersion: row.idpVersion,
      released: !isPublished,
    });
    // console.log("previous_res")
    // console.log(previous_res)
    if (!isPublished){
      const users = await getUser();
      const previous_res = await getSemesterIdpResponse(row.semester)
      if (previous_res.length == 0) {
        for (let i=0; i<users.length; i++){
          if (users[i].authority!=='A'){
            // console.log({userId: users[i].displayId, semester: row.semester})
            await postIdpResponse({email: users[i].email, semester: row.semester});
          }
        } 
      }
    }
    setIsPublished(!isPublished);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Button style={{backgroundColor:ORANGE}} 
    className="rounded-full ml-2 h-6"
    onClick={() => handleClick(row.original)}
    disabled={isPublished}
  >
    {isPublished ? "已發佈":"發佈"}
  </Button>
  );
};
