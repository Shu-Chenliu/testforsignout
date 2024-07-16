import "next-auth";
import type { DefaultSession } from "next-auth";
type User ={
  email: string;
  username: string;
  mobile: string;
  authority: string;
  school: string;
}
// import type { User } from "@/lib/types/db";
declare module "next-auth" {
  
  interface Session extends DefaultSession {
    user?: User;
  }
}