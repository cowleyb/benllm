import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { env } from '../env';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import { oAuthProxy } from 'better-auth/plugins';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  socialProviders: {
    discord: {
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
      redirectURI: env.NEXT_PUBLIC_BETTER_AUTH_URL ?? 'https://food.bencow.dev/api/auth/callback/discord',
    },
  },

  plugins: [
    oAuthProxy({
      productionURL: 'https://food.bencow.dev', // Optional - if the URL isn't inferred correctly
      currentURL: 'http://localhost:3000',
    }),
    nextCookies(),
  ], // make sure next is the last plugin in the array
  trustedOrigins: [...(env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []), 'https://benchat.bencow.dev'],
});
