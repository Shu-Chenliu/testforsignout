// import NextAuth from "next-auth";
// import CredentialsProvider from "./CredentialsProvider";
// import { USERS } from "../constants";

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [CredentialsProvider],
//   callbacks: {
//     async session({ session, token }) {
//       const userEmail = token.email || session?.user?.email;
//       if (!userEmail) return session;
//       const user = USERS[USERS.findIndex(({ email }) => email === userEmail)];
//       if (session.user) {
//         session.user.username = user.username;
//         session.user.email = user.email;
//         session.user.mobile = user.mobile;
//         session.user.authority = user.authority;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/",
//   },
// });
import NextAuth from "next-auth";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { experiencesTable, usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      if (!email) return session;
      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
          provider: usersTable.provider,
          email: usersTable.email,
          mobile: usersTable.mobile,
          authority: usersTable.authority,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();
      const [experience]= await db.query.experiencesTable.findMany({
        columns:{
          school:true,
        },
        where:eq(experiencesTable.email,email.toLowerCase()),
        orderBy: [desc(experiencesTable.email)],
        limit: 1
      })

      return {
        ...session,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          provider: user.provider,
          mobile: user.mobile,
          authority:user.authority,
          school: experience?experience.school:""
        },
      };
    },
    // async signIn({ user, account, profile, email, credentials }){
    //   if(user?.error === 'my custom error') {
    //     throw new Error('custom error to the client')
    //   }
    //   return true
    // }
    // async jwt({ token, account }) {
    //   // Sign in with social account, e.g. GitHub, Google, etc.
    //   if (!account) return token;
    //   const { name, email } = token;
    //   const provider = account.provider;
    //   if (!name || !email || !provider) return token;

    //   // Check if the email has been registered
    //   const [existedUser] = await db
    //     .select({
    //       id: usersTable.displayId,
    //     })
    //     .from(usersTable)
    //     .where(eq(usersTable.email, email.toLowerCase()))
    //     .execute();
    //   if (existedUser) return token;
    //   if (provider !== "github") return token;

    //   // Sign up
    //   await db.insert(usersTable).values({
    //     username: name,
    //     email: email.toLowerCase(),
    //     provider,
    //     mobile: "091111111",
    //   });

    //   return token;
    // },
  },
  pages: {
    signIn: "/",
  },
  debug:true,
});
