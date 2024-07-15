import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useIdpStatus() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const postExperience = async ({
    email,
    semester,
    school,
    position,
    subject,
    role,
    feature,
  }: {
    email: string,
    semester: string,
    school: string,
    position: string,
    subject: string,
    role: string,
    feature: string,
  }) => {
    setLoading(true);
    const res = await fetch("/api/experience", {
      method: "POST",
      body: JSON.stringify({email, semester, school, position, subject, role, feature}),
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
  };

  const updateExperience = async ({
    id,
    school,
    position,
    subject,
    role,
    feature,
  }: {
    id: number,
    school?: string,
    position?: string,
    subject?: string,
    role?: string,
    feature?: string,
  }) => {
    setLoading(true);
    const res = await fetch("/api/experience", {
      method: "PUT",
      body: JSON.stringify({ id, school, position, subject, role, feature }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
  };

  const getExperience = async () => {
    setLoading(true);
    const res = await fetch("/api/experience", {
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
    return body.experiencesStatus;
  };

  return {
    postExperience,
    updateExperience,
    getExperience,
    loading,
  };
}
