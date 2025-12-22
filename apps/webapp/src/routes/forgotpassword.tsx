import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/forgotpassword')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <AlertCircle className="text-muted-foreground h-12 w-12" />
          </div>
          <CardTitle>Unlucky</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">I havent made this function yet, so goodluck and try to remember your password :)</p>
        </CardContent>
      </Card>
    </div>
  );
}
