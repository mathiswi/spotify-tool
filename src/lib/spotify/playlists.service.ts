import { Playlist, PlaylistResponse } from "@/types/Playlist";
import { customGet, customRawGet } from "./utils/requestWrapper";

export async function getPlaylistsForCurrentUser(): Promise<Playlist[]> {
  const res: PlaylistResponse = await customGet("/me/playlists");
  if (res.next) {
    const nextRes: PlaylistResponse = await customRawGet(res.next);
    res.items.push(...nextRes.items);
  }

  return res.items;
}
