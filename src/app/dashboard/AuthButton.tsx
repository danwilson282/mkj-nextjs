// src/components/AuthButton.tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        {/* {session.user.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User avatar"}
            width={40}
            height={40}
            className="rounded-full"
          />
        )} */}
        <div>
          <p className="text-sm font-medium">{session.user.name}</p>
          <p className="text-xs text-gray-600">{session.user.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Sign in with Google
    </button>
  );
}
