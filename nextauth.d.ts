import "next-auth";
import type { DefaultSession } from "next-auth";
type User ={
  id:string,
  email: string;
  username: string;
  mobile: string;
  authority: string;
  school: string;
  provider: "github" | "credentials";
}
// import type { User } from "@/lib/types/db";
declare module "next-auth" {
  
  interface Session extends DefaultSession {
    user?: User;
  }
}