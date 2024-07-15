import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useIdpResponse() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const postIdpResponse = async ({
    email,
    semester,
  }: {
    email: string,
    semester: string,
  }) => {
    setLoading(true);
    const res = await fetch("/api/idpResponse", {
      method: "POST",
      body: JSON.stringify({
        email,
        semester,}),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
  };

  const updateIdpResponse = async ({
    displayId,
    status,
    response,
    notes
  }: {
    displayId: string,
    status?: string,
    response?: object,
    notes?: string
  }) => {
    setLoading(true);
    const res = await fetch("/api/idpResponse", {
      method: "PUT",
      body: JSON.stringify({
        displayId,
        status,
        response,
        notes
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
  };

  const getIdpResponse = async (responseId: string) => {
    setLoading(true);
    const res = await fetch(`/api/idpResponse/${responseId}`, {
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

  const getIdpResponseByEmail = async (email: string) => {
    setLoading(true);
    const res = await fetch(`/api/idpResponse/user/${email}`, {
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
    return body.idpResponse;
  };

  const getSemesterIdpResponse = async (semester: string) => {
    setLoading(true);
    const res = await fetch(`/api/idpResponse/semester/${semester}`, {
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
    return body.idpResponse;
  };

  return {
    postIdpResponse,
    updateIdpResponse,
    getIdpResponse,
    getSemesterIdpResponse,
    getIdpResponseByEmail,
    loading,
  };
}
