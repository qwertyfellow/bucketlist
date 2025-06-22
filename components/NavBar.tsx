// components/Navbar.tsx
import Link from "next/link";
// import { auth } from "@/auth"; // adjust the path based on where your auth.ts lives

export default async function Navbar() {
  const session = true;

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
            <Link href="/about" className="text-16-medium url">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-16-medium url">
              Contact
            </Link>
          </li>
          <li>
            {session? (
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="bg-secondary rounded px-3 py-2 m-2 text-white"
                >
                  Log out
                </button>
              </form>
            ) : (
              <form action="/api/auth/signin" method="POST">
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
