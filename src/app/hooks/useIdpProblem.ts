import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Section } from "@/types/type";

export default function useIdpProblem() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const postNewIdpVersion = async ({
    data
  }: {
    data: Section[]
  }) => {
    setLoading(true);
    const res = await fetch("/api/idpProblem", {
      method: "POST",
      body: JSON.stringify({data}),
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    console.log(body.posted.versionId);
    router.refresh();
    setLoading(false);
    return body.posted.versionId;
  };


  const updateExistingIdpVersion = async ({
    versionId,
    data
  }: {
    versionId: number,
    data: Section[]
  }) => {
    setLoading(true);
    const res = await fetch("/api/idpProblem", {
      method: "PUT",
      body: JSON.stringify({ versionId,data }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
  };

  const getIdpProblem = async (versionId:number) => {
    setLoading(true);
    const res = await fetch(`/api/idpProblem/${versionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }
    // console.log(body);
    router.refresh();
    setLoading(false);
    return body.data;
  };

  const getIdpVersions = async () => {
    setLoading(true);
    const res = await fetch(`/api/idpProblem/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }
    // console.log(body);
    router.refresh();
    setLoading(false);
    return body.idpProblems;
  }

  return {
    postNewIdpVersion,
    updateExistingIdpVersion,
    getIdpProblem,
    getIdpVersions,
    loading,
  };
}
