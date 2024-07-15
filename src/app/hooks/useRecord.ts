import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useRecord() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postRecord = async ({
    studentEmail,
    courseId,
    qualification1,
    qualification2,
    quantification1,
    quantification2
  }: {
    studentEmail: string,
    courseId: string,
    qualification1?: string,
    qualification2?: string,
    quantification1?: string,
    quantification2?: string
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseRecord", {
      method: "POST",
      body: JSON.stringify({
        studentEmail,
        courseId,
        qualification1,
        qualification2,
        quantification1,
        quantification2
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };
  const updateRecord = async ({
    studentEmail,
    courseId,
    qualification1,
    qualification2,
    quantification1,
    quantification2
  }: {
    studentEmail: string,
    courseId: string,
    qualification1?: string,
    qualification2?: string,
    quantification1?: string,
    quantification2?: string
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseRecord", {
      method: "PUT",
      body: JSON.stringify({
        studentEmail,
        courseId,
        qualification1,
        qualification2,
        quantification1,
        quantification2
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };
  const deleteRecord = async ({
    studentEmail,
    courseId,
  }: {
    studentEmail: string,
    courseId: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseRecord", {
      method: "DELETE",
      body: JSON.stringify({
        studentEmail,
        courseId,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };


  return {
    postRecord,
    updateRecord,
    deleteRecord,
    loading,
  };
}
