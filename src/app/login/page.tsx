import { signIn } from "@/auth";
import Image from "next/image"; // Import the Image component from the correct package

export default function SignIn() {
  async function handleSignIn() {
    await signIn("spotify");
  }
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-20">
      <Image
        src="/images/spotify_logo.png"
        alt="spotify logo"
        width={320}
        height={96}
      />
      <form action={handleSignIn}>
        <button
          className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
          type="submit"
        >
          Signin with Spotify
        </button>
      </form>
    </div>
  );
}
