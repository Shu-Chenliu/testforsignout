import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useTeacher() {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTeacher = async ({
    teacherEmail,
    courseId,
  }: {
    teacherEmail: string,
    courseId: string
  }) => {
    setLoading(true);

    const res = await fetch("/api/teacherToCourse", {
      method: "POST",
      body: JSON.stringify({
        teacherEmail,
        courseId:courseId,
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
    postTeacher,
  };
}
