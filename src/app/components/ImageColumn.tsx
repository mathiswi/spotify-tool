"use client";
import { TrayContext } from "@/providers/TrayContext";
import { Playlist } from "@/types/Playlist";
import { Image } from "primereact/image";
import { useContext } from "react";

export function ImageColumn(playlist: Playlist) {
  return (
    <Image
      src={playlist.images?.[0]?.url || "https://via.placeholder.com/50"}
      width="50"
    />
  );
}
