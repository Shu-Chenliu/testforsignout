import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useIdpStatus() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const postNewSemesterStatus = async ({
    semester,
    updateTime,
    idpVersion,
    released,
  }: {
    semester: string,
    updateTime: string,
    idpVersion: number,
    released: boolean,
  }) => {
    setLoading(true);
    const res = await fetch("/api/idpStatus", {
      method: "POST",
      body: JSON.stringify({semester, updateTime, idpVersion, released}),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
  };

  const updateIdpStatus = async ({
    semester,
    updateTime,
    idpVersion,
    released
  }: {
    semester: string,
    updateTime: string,
    idpVersion?: number,
    released?: boolean
  }) => {
    setLoading(true);
    const res = await fetch("/api/idpStatus", {
      method: "PUT",
      body: JSON.stringify({ semester,updateTime,idpVersion,released }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
  };

  const getIdpSemesterStatus = async (semester: string) => {
    setLoading(true);
    const res = await fetch(`/api/idpStatus/${semester}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
    return body;
  };

  const getIdpStatus = async () => {
    setLoading(true);
    const res = await fetch(`/api/idpStatus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
    return body.idpStatus;
  };

  return {
    postNewSemesterStatus,
    updateIdpStatus,
    getIdpSemesterStatus,
    getIdpStatus,
    loading,
  };
}
