import "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    username: string;
    mobile: string;
    authority: string;
    school: string;
  }
}