"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
function SignOutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      console.log("SignOutPage useEffect triggered:", { session, status });

      if (status === "loading") return;

      if (session) {
        try {
          await signOut({callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL});
          console.log("Signed out successfully");
          alert("Signed out successfully");
        } catch (error) {
          console.error("Error during sign out:", error);
          alert("Error during sign out: " + error);
        } finally {
          router.push("/");
        }
      } else {
        console.log("No session found, redirecting to home page");
        alert("No session found, redirecting to home page");
        router.push("/");
      }
    };

    handleSignOut();
  }, [session, status, router]);

  return <></>;
}

export default SignOutPage;
