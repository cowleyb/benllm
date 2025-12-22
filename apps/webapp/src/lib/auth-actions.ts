import { authClient } from '@repo/auth/client';
import type { loginSchema, signUpSchema } from './schemas/auth-schema';
import { z } from 'zod';
import { redirect, useNavigate } from '@tanstack/react-router';

export async function signInWithDiscord() {
  const res = await authClient.signIn.social({
    provider: 'discord',
    callbackURL: '/',
  });

  console.log('Discord sign-in response:', res);
}

export async function signInWithEmail(values: z.infer<typeof loginSchema>) {
  const res = await authClient.signIn.email({
    email: values.email,
    password: values.password,
    callbackURL: '/',
  });
  return res;
}

export async function signOut() {
  const res = await authClient.signOut();
  console.log('Sign-out response:', res);
  return res;
}

export async function signUpWithEmail(values: z.infer<typeof signUpSchema>) {
  const res = await authClient.signUp.email({
    name: values.name,
    email: values.email,
    password: values.password,
    callbackURL: '/',
  });
  return res;
}
