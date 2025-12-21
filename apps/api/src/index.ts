import { Hono } from 'hono';
import { auth } from '@repo/auth';
import { cors } from 'hono/cors';

const app = new Hono();

const welcomeStrings = ['Hello Hono!', 'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono'];

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

console.log('Auth module loaded');

export default app;
