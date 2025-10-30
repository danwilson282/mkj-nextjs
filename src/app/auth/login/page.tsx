'use client';
import { useSearchParams } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
export default function LoginPage() {
  const searchParams = useSearchParams();
  const signUserOut = searchParams?.has('signout');
  useEffect(() => {
    if (signUserOut) {
      signOut({ callbackUrl: '/auth/login' });
    }
  }, [signUserOut]);
  const [email, setEmail] = useState('');
  const [emailMagic, setEmailMagic] = useState('');
  const [password, setPassword] = useState('');
  const [sent, setSent] = useState(false);
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/dashboard',
    });
  };
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('email', {
      email: emailMagic,
      redirect: false,
      callbackUrl: '/dashboard',
    });
    setSent(true);
  };
  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('google', { redirect: true, callbackUrl: '/dashboard' });
  };

  if (sent) {
    return <p>Check your email for a magic link.</p>;
  }

  return (
    <>
      <form
        onSubmit={handleEmailSubmit}
        className="flex flex-col gap-3 max-w-sm mx-auto mt-12"
      >
        <p>Email magic link</p>
        <input
          type="email"
          value={emailMagic}
          onChange={(e) => setEmailMagic(e.target.value)}
          placeholder="Your email"
          required
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white rounded p-2" type="submit">
          Login with email magic link
        </button>
      </form>

      <form
        onSubmit={handleCredentialsSubmit}
        className="flex flex-col gap-3 max-w-sm mx-auto mt-12"
      >
        <p>Credentials</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white rounded p-2">
          Login with credentials
        </button>
      </form>
      <form
        onSubmit={handleGoogleSubmit}
        className="flex flex-col gap-3 max-w-sm mx-auto mt-12"
      >
        <p>Google</p>
        <button className="bg-blue-600 text-white rounded p-2">
          Login with google
        </button>
      </form>
    </>
  );
}
