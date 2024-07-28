"use server";
import { getPlaylistsForCurrentUser } from "@/lib/spotify/playlists.service";
import { Playlist } from "@/types/Playlist";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ImageColumn } from "./ImageColumn"; // Import the client component for the image column

export async function Playlists() {
  const playlists: Playlist[] = await getPlaylistsForCurrentUser();

  return (
    <div>
      <DataTable
        value={playlists}
        scrollable
        // TODO: make flex
        scrollHeight="82vh"
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column header="Image" body={ImageColumn}></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="tracks.total" header="Tracks" sortable></Column>
      </DataTable>
    </div>
  );
}
