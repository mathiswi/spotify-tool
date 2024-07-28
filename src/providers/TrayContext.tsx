"use client";
import { Track } from "@/types/Track";
import { createContext } from "react";
import { mockTrack } from "./mockTrack";

export const TrayContext = createContext<Track[]>([]);

export default function TrayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrayContext.Provider value={[mockTrack]}>{children}</TrayContext.Provider>
  );
}
