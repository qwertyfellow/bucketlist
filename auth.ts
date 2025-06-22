// auth.ts (in project root or `src/`)
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({user, account, profile}) {
        console.log("############")
        console.log(user)
        console.log(account)
        console.log(profile)
        console.log("############")
        return true
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
