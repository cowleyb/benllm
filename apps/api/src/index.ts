import { Hono } from 'hono';
import { auth } from '@repo/auth';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { cors } from 'hono/cors';

import { protectedRoute } from './middleware/routes';

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

const app = new Hono<Env>();

const routes = app
  .on(['POST', 'GET'], '/api/auth/*', (c) => {
    return auth.handler(c.req.raw);
  })

  .get('/api/protected', protectedRoute, async (c) => {
    const user = c.get('user');
    return c.json({ success: true, message: 'You have accessed a protected route', user });
  });

export type AppType = typeof routes;
export default app;
