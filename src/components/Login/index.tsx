'use client';

import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { LoginButton } from '@danwilson282/mkj-component-library';
export type LoginModalProps = {
  session: Session;
};

export const LoginModal: React.FC<LoginModalProps> = ({ session }) => {
  const [email, setEmail] = useState('');
  const [emailMagic, setEmailMagic] = useState('');
  const [password, setPassword] = useState('');

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
  };
  const handleGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('google', { redirect: true, callbackUrl: '/dashboard' });
  };

  return (
    <LoginButton
      user={session?.user}
      registerPage={{
        label: 'No account? Register now',
        url: '/auth/register',
      }}
      signOut={{ label: 'Logout', handleSignOut: signOut }}
      useGoogle={{
        title: 'Google',
        label: 'Sign in with Google',
        handleGoogleSubmit: handleGoogleSubmit,
      }}
      useCredentials={{
        title: 'Username / password',
        label: 'Sign in with username/password',
        email: email,
        setEmail: setEmail,
        password: password,
        setPassword: setPassword,
        handleCredentialsSubmit: handleCredentialsSubmit,
      }}
      useEmail={{
        title: 'Magic link (passwordless)',
        label: 'Sign in with Magic Link',
        email: emailMagic,
        setEmail: setEmailMagic,
        handleEmailSubmit: handleEmailSubmit,
      }}
    />
  );
};
