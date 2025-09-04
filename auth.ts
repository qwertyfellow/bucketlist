import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/writeClient";
import { FETCH_CREATOR_BY_GOOGLE_ID_QUERY } from "./sanity/queries/creator";
import { cookies } from "next/headers";

export const authOptions = {
  trustedHosts: [
    "localhost:3000",   // for local dev
    "127.0.0.1:3000",   // optional
    "bucketlist-phi.vercel.app"
  ],
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account", // 👈 Force Google account selector
          access_type: "offline",
          response_type: "code",
        },
      },
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
      const loginType = cookieStore.get("loginType")?.value || "creator";
      console.log("COOKIES loginType", loginType)

      // 3. Differentiate between creator and user flows
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

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        const googleId = account.providerAccountId;

        const cookieStore = await cookies();
        const loginType = cookieStore.get("loginType")?.value || "creator";
        console.log("COOKIES loginType", loginType)

        token.loginType = loginType;

        const existingCreator = await client
          .withConfig({ useCdn: false })
          .fetch(FETCH_CREATOR_BY_GOOGLE_ID_QUERY, {
            id: googleId,
          });

        if(existingCreator) {
          token.id = existingCreator._id;
          token.name = existingCreator.name;
          token.email = existingCreator.email;
          token.image = existingCreator.image;
        }
        token.accountId = googleId;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.sanityId = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        Object.assign(session.user, {accountId: token.accountId})
        Object.assign(session.user, {loginType: token.loginType})
      }
      return session;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
