export interface ExternalUrls {
  spotify: string;
}

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Owner {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface Tracks {
  href: string;
  total: number;
}
