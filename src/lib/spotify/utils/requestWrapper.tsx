import { auth } from "@/auth";

const SPOTIFY_API_URL = "https://api.spotify.com";

export async function customGet(endpoint: string) {
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
}

export async function customRawGet(url: string) {
  const session = await auth();
  if (!session) {
    return null;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.token.accessToken}`,
    },
  }).then((res) => res.json());

  return res;
}
