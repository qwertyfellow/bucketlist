// auth.ts (in project root or `src/`)
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { FETCH_USER_BY_GOOGLE_ID_QUERY } from "./sanity/queries/user";
import { writeClient } from "./sanity/lib/writeClient";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const googleId = account?.providerAccountId;
      if (!googleId) {
        console.error("No Google ID found");
        return false;
      }
      const existingUser = await client
      .withConfig({useCdn: false})
      .fetch(FETCH_USER_BY_GOOGLE_ID_QUERY, {
        id: googleId,
      });

      if (existingUser) {
        console.log("User already signed up.");
      } else {
        await writeClient.create({
          _type: "user",
          authId: googleId,
          name: user.name,
          email: user.email,
          image: user.image,
          bio: "A cool bio...",
          role: "user",
        });
        console.log("User is just added.");
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        console.log("First time sign in.")
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(FETCH_USER_BY_GOOGLE_ID_QUERY, {
            id: account.providerAccountId,
          });

        if (user) {
          token.id = user._id;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image;
        }
      }
    return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
