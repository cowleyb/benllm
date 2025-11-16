import { createAuthClient } from 'better-auth/react';

import { env } from '@/src/env';

// Prefer an explicit public BETTER_AUTH URL when provided. In the browser prefer
// the configured NEXT_PUBLIC_BETTER_AUTH_URL (if set) so dev builds / Tauri dev
// will use the local better-auth instance instead of falling back to a live
// production origin. Fall back to window.location.origin if no public URL is set.
const getBaseURL = () => {
  // When running server-side during development, prefer the explicit public
  // BETTER_AUTH URL if present, otherwise default to localhost:3000.
  if (env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  return env.NEXT_PUBLIC_BETTER_AUTH_URL;
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});
