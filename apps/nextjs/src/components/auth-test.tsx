import { auth } from '@/src/lib/server';
import { redirect } from 'next/navigation';

export default function AuthTest() {
  const signIn = async () => {
    'use server';
    const res = await auth.api.signInSocial({
      body: {
        provider: 'discord',
        callbackURL: '/',
      },
    });
    console.log(res);
    if (!res.url) {
      throw new Error('No URL returned from signInSocial');
    }
    redirect(res.url);
  };

  return (
    <form action={signIn}>
      <button type="submit">Sign in with Discord</button>
    </form>
  );
}
