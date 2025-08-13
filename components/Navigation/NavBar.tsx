import { auth } from "@/auth";
import { loginHandler, logoutHandler } from "@/lib/actions/auth/authentication";
import Link from "next/link";
import Image from "next/image";
import AvatarMenu from "./AvatarMenu";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full px-4 py-2 border-b">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          <Image src="/logo.png" alt="Roamfluencer logo" width={70} height={70}/>
        </Link>

        {/* Nav items */}
        <div className="flex items-center space-x-4">
          {session?.user && <AvatarMenu user={session.user} />}
          <form action={session ? logoutHandler : loginHandler}>
            <button
              type="submit"
              className="bg-secondary rounded px-3 py-2 text-white"
            >
              {session ? "Log out" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
