"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignOutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      signOut()
        .then(() => {
          alert("Signed out successfully");
          router.push("/");
        })
        .catch((error) => {
          alert("Error during sign out: " + error.message);
        });
    } else {
      alert("No session found, redirecting to home page");
      router.push("/");
    }
  }, [session, router]);

  return <></>;
}

export default SignOutPage;
