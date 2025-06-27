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
      .withConfig({useCdn: false}) // USE THIS, else newly added users are not reflected immediately.
      .fetch(FETCH_USER_BY_GOOGLE_ID_QUERY, {
        id: googleId,
      });
      console.log("existingUser", existingUser)

      if (!existingUser) {
        await writeClient.create({
          _type: "user",
          authId: googleId,
          name: user.name,
          email: user.email,
          image: user.image,
          bio: "A cool bio...",
          role: "user",
        });
        console.log("################################################");
        console.log("User is just added.");
        console.log("################################################");
        return true;
      }

      return true;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
