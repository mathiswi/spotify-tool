import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-modify-private playlist-modify-public";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Spotify({
      // Used as a workaround since specifying scope directly doesnt work currently
      authorization: `https://accounts.spotify.com/authorize?scope=${scope}`,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.expires_at = account.expires_at;
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
});
