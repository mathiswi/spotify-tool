import { auth } from "@/auth";

const SPOTIFY_API_URL = "https://api.spotify.com";

export const customGet = async (endpoint: string) => {
  console.log("customGet", endpoint);
  const session = await auth();
  if (!session) {
    return null;
  }
  const url = new URL(`v1${endpoint}`, SPOTIFY_API_URL);
  const res = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${session.token.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
};
