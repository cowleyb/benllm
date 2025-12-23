import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '@repo/db';
import { env } from '@repo/env';

// const baseUrl = env.VERCEL_ENV === 'production' ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : env.VERCEL_ENV === 'preview' ? `https://${env.VERCEL_URL}` : 'http://localhost:5173';
// console.log(env.VERCEL_ENV, baseUrl);

const baseUrl = env.VERCEL_ENV == 'production' ? `https://chat.bencow.dev` : 'http://localhost:5173';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    discord: {
      clientId: env.BETTER_AUTH_DISCORD_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_DISCORD_CLIENT_SECRET,
      redirectURI: `${baseUrl}/api/auth/callback/discord`,
    },
  },
  trustedOrigins: [baseUrl, 'https://chat.bencow.dev'],
});
