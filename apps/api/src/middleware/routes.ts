import { Context, Next } from 'hono';
import { auth } from '@repo/auth';

export const protectedRoute = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json({ success: false, message: 'Unauthorized', error: 'No valid session found' }, 401);
  }

  console.log('Protected route accessed by user:', session.user);

  c.set('user', session.user);
  c.set('session', session.session);

  await next();
};
