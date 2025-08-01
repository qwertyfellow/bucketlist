'use client';

// Below import only works in client components.
import { signIn } from 'next-auth/react';

export default function CreatorSigninButton() {
  const handleClick = async () => {
    document.cookie = "loginType=creator; path=/; max-age=30"; // valid for 30 seconds
    await signIn("google");
  };

  return (
    <button
      className="bg-secondary rounded px-3 py-2 m-2 text-white"
      onClick={handleClick}
    >
      Sign in with Google
    </button>
  );
}
