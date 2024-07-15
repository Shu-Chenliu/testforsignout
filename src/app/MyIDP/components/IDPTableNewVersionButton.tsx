"use client"
import { useEffect, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { ManageIDPProps } from './dataType';
import { Button } from "@/components/ui/button"
import { ORANGE } from "@/lib/constants";
// import useIdpProblem from "@/app/hooks/useIdpProblem";


// Define the props for the action button component
interface IDPTableButtonProps {
  row: Row<ManageIDPProps>;
}

export const IDPNewVersionButton: React.FC<IDPTableButtonProps> = () => {
  const [isMounted, setIsMounted] = useState(false);
  // const { updateExistingIdpVersion, postNewIdpVersion, getIdpProblem } = useIdpProblem();
  // const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = () => {
    if (isMounted){
      // TODO: useRouter failed; need to get original idp before post
      // router.push(`/MyIDP/IDP/${row.original.semester}`);
      // postNewIdpVersion()
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
    建立新版本
    </Button>
  );
};
