import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [Spotify],
});
