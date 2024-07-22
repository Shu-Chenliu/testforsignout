import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { experiencesTable, usersTable } from "@/db/schema";
import { authSchema } from "@/validators/auth";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    username: { label: "Userame", type: "text", optional: true },
    password: { label: "Password", type: "password"},
    mobile:{ label:"Mobile", type:"text", optional: true},
    school:{ label:"School", type:"text", optional: true}
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
      username?: string;
      password: string;
      mobile?:string;
      school?:string;
    };

    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.log("Wrong credentials. Try again.");
      return null;
    }
    const { email, password } = validatedCredentials;

    const [existedUser] = await db
      .select({
        id: usersTable.displayId,
        username: usersTable.username,
        email: usersTable.email,
        provider: usersTable.provider,
        hashedPassword: usersTable.hashedPassword,
        mobile: usersTable.mobile,
        authority: usersTable.authority,
        school: experiencesTable.school
      })
      .from(usersTable)
      .leftJoin(experiencesTable, eq(usersTable.email, experiencesTable.email))
      .orderBy(desc(experiencesTable.semester))
      .where(eq(usersTable.email, email.toLowerCase()))
      .limit(1)
      .execute();
    // console.log({
    //   email: existedUser.email,
    //   username: existedUser.username,
    //   id: existedUser.id,
    //   mobile: existedUser.mobile,
    //   authority:existedUser.authority,
    //   school: existedUser.school??""
    // })
    if(!existedUser){
      // return { message: "輸入的帳號不存在或有誤，請再次輸入" ,email:"", password:""};
      // throw new Error("輸入的帳號不存在或有誤，請再次輸入");
      console.log("帳號不存在");
      return null;
    }
    const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
    if (!isValid) {
      // throw new Error("輸入的密碼不正確，請再次輸入");
      console.log("輸入的密碼不正確，請再次輸入");
      return null;
    }
    return {
      email: existedUser.email,
      username: existedUser.username,
      id: existedUser.id,
      mobile: existedUser.mobile,
      authority:existedUser.authority,
      school: existedUser.school??""
    };
  },
});
