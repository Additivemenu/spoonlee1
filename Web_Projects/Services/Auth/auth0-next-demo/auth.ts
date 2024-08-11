import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"

// config next-auth
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
});
