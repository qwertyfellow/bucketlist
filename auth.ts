import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/writeClient";
import { FETCH_USER_BY_GOOGLE_ID_QUERY } from "./sanity/queries/user";
import { FETCH_CREATOR_BY_GOOGLE_ID_QUERY } from "./sanity/queries/creator";
import { cookies } from "next/headers";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {

      // 1. Extract the id
      const googleId = account?.providerAccountId;
      if (!googleId) {
        console.error("No Google ID found");
        return false;
      }

      //2. Extract loginType intent from cookies
      const cookieStore = await cookies();
      const loginType = cookieStore.get("loginType")?.value || "user";

      // 3. Differentiate between creator and user flows
      if (loginType === "creator") {
        // Creator flow
        const existingCreator = await client
          .withConfig({ useCdn: false })
          .fetch(FETCH_CREATOR_BY_GOOGLE_ID_QUERY, {
            id: googleId,
          });

        if (!existingCreator) {
          await writeClient.create({
            _type: "creator",
            authId: googleId,
            name: user.name,
            email: user.email,
            image: user.image,
            bio: "New creator joined!",
            isCreator: true,
            createdAt: new Date().toISOString(),
            slug: {
              current: `${user.name?.toLowerCase().replace(/\s+/g, "-")}-${googleId.slice(-4)}`
            }
          });
          console.log("Creator added.");
        } else {
          console.log("Creator already exists.");
        }
      } else {
        // Default to user login
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(FETCH_USER_BY_GOOGLE_ID_QUERY, { id: googleId });

        if (!existingUser) {
          await writeClient.create({
            _type: "user",
            authId: googleId,
            name: user.name,
            email: user.email,
            image: user.image,
            bio: "A cool bio...",
          });
          console.log("User added.");
        } else {
          console.log("User already exists.");
        }
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        const googleId = account.providerAccountId;

        const cookieStore = await cookies();
        const loginType = cookieStore.get("loginType")?.value || "user";

        token.loginType = loginType;

        if (loginType === "creator") {
          const creator = await client
            .withConfig({ useCdn: false })
            .fetch(FETCH_CREATOR_BY_GOOGLE_ID_QUERY, {
              id: googleId,
            });

          if (creator) {
            token.id = creator._id;
            token.name = creator.name;
            token.email = creator.email;
            token.image = creator.image;
          }
        } else {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(FETCH_USER_BY_GOOGLE_ID_QUERY, {
              id: googleId,
            });

          if (user) {
            token.id = user._id;
            token.name = user.name;
            token.email = user.email;
            token.image = user.image;
          }
        }

        token.accountId = googleId;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        Object.assign(session, {accountId: token.accountId})
        Object.assign(session, {loginType: token.loginType})
      }
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
