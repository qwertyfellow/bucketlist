import { auth } from "@/auth";
import { loginHandler, logoutHandler } from "@/lib/actions/auth/authentication";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full ps-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black">
          Logo
        </Link>

        {/* Nav items */}
        <ul className="flex space-x-4 items-center">
          <li>
            {session? (
              <form action={logoutHandler}>
                <button
                  type="submit"
                  className="bg-secondary rounded px-3 py-2 m-2 text-white"
                >
                  Log out
                </button>
              </form>
            ) : (
              <form action={loginHandler}>
                <button
                  type="submit"
                  className="bg-secondary rounded px-3 py-2 m-2 text-white"
                >
                  Login
                </button>
              </form>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
