import { Hono } from 'hono';
import { auth } from '@repo/auth';
import { cors } from 'hono/cors';

const app = new Hono();

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

console.log('Auth module loaded');

export default app;
