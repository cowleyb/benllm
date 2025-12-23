import { Hono } from 'hono';
import { auth } from '@repo/auth';
import { cors } from 'hono/cors';

const app = new Hono();

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

const welcomeStrings = ['Hello Hono!', 'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono'];

app.get('/', (c) => {
  return c.text(welcomeStrings.join('\n\n'));
});

console.log('Auth module loaded');

export default app;
