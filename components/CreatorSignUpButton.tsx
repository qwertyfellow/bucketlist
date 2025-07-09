'use client';

import { signIn } from 'next-auth/react';

export default function CreatorSignupButton() {
  const handleClick = async () => {
    await signIn("google", {
      callbackUrl: "/creators/onboard?source=creator-join"
    });
  };

  return (
    <button
      className="bg-secondary rounded px-3 py-2 m-2 text-white"
      onClick={handleClick}
    >
      Sign up with Google
    </button>
  );
}
