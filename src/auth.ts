import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";

const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-modify-private playlist-modify-public";
const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("Refreshing token");
    const basicAuth = Buffer.from(
      `${process.env.AUTH_SPOTIFY_ID}:${process.env.AUTH_SPOTIFY_SECRET}`
    ).toString("base64");

    const response = await fetch(SPOTIFY_REFRESH_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const data = await response.json();
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires * 1000
      ) {
        return token;
      }
      if (!token.refreshToken) {
        return null;
      }
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }) {
      session.token = token;
      return session;
    },
  },
});
