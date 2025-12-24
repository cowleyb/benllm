import { authClient } from '@repo/auth/client';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from '~/components/login-form';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: async ({ location }) => {
    const { data: session } = await authClient.getSession();
    if (session) {
      throw redirect({
        to: '/',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
