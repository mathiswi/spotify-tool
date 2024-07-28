import { customGet } from "@/lib/spotify/utils/requestWrapper";

export default async function Home() {
  const playlists: any = await customGet("/me/playlists");
  console.log(playlists);
  return (
    <>
      <div>Playlists</div>
      <div>
        {playlists.items.map((element: any) => {
          return <span key={element.uri}>{element.name}</span>;
        })}
      </div>
    </>
  );
}
