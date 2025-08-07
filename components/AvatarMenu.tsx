"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

interface AvatarMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  };
}

export default function AvatarMenu({ user }: AvatarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <Image
        src={user?.image || "/avatar.jpg"}
        alt={user?.name || "User Avatar"}
        width={36}
        height={36}
        className="avatar"
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen((prev) => !prev)}
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div className="menuWrapper" onMouseLeave={() => setIsOpen((prev) => !prev)}>
            <Link
                href={`/creators/profile/${user?.sanityId}`}
                className="menuItem"
                onClick={() => setIsOpen(false)}
            >
                <span className="flex flex-row items-center justify-center gap-2">
                    <User />Profile
                </span>
            </Link>
        </div>
      )}
    </div>
  );
}
