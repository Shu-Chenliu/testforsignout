"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignOutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
        alert("Signed out successfully");
      } catch (error) {
        console.error("Error signing out:", error);
      } finally {
        router.push("/");
      }
    };

    if (session) {
      handleSignOut();
    } else {
      alert("No session found, redirecting...");
      router.push("/");
    }
  }, [session, router]);

  return <></>;
}

export default SignOutPage;
