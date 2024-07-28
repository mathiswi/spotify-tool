import TrayProvider from "@/providers/TrayContext";
import "../styles/globals.css";
import type { Metadata } from "next";
import "primereact/resources/themes/lara-dark-indigo/theme.css";

export const metadata: Metadata = {
  title: "Spotify Tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TrayProvider>
        <body>{children}</body>
      </TrayProvider>
    </html>
  );
}
