import { cn } from '~/lib/utils';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { PasswordInput } from '~/components/password-input';
import { signInWithDiscord, signUpWithEmail } from '~/lib/auth-actions';
import { useForm } from '@tanstack/react-form';
import { signUpSchema } from '~/lib/schemas/auth-schema';

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: signUpSchema,
      onSubmitAsync: async ({ value }) => {
        const result = await signUpWithEmail(value);
        return result.error ? (result.error.message ?? 'An error occurred during sign up') : undefined;
      },
    },
    onSubmit: async () => {
      // If we get here, validation passed and sign-up was successful
      // The redirect should happen automatically via callbackURL
    },
  });
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Sign up with your Discord account</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <form action={signInWithDiscord} className="w-full">
                <Button variant="outline" type="submit" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="currentColor" className="mr-2 h-4 w-4">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.82,105.82,0,0,0,126.6,80.22c1.24-23.28-3.28-47.56-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                  Sign up with Discord
                </Button>
              </form>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or continue with</FieldSeparator>
            <form
              id="signup-form"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="flex w-full flex-col gap-4"
            >
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} type="text" placeholder="John Doe" required />
                      {isInvalid && <FieldError errors={field.state.meta.errors.map((error: any) => ({ message: error?.message ?? error?.toString() }))} />}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} type="email" placeholder="m@example.com" required />
                      {isInvalid && <FieldError errors={field.state.meta.errors.map((error: any) => ({ message: error?.message ?? error?.toString() }))} />}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <PasswordInput id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} required />
                      {isInvalid && <FieldError errors={field.state.meta.errors.map((error: any) => ({ message: error?.message ?? error?.toString() }))} />}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="confirmPassword"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                      <PasswordInput id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} required />
                      {isInvalid && <FieldError errors={field.state.meta.errors.map((error: any) => ({ message: error?.message ?? error?.toString() }))} />}
                    </Field>
                  );
                }}
              />

              <form.Subscribe
                selector={(state) => ({ error: state.errorMap.onSubmit, isSubmitting: state.isSubmitting })}
                children={({ error, isSubmitting }) => (
                  <>
                    {error && <p className="text-destructive text-sm">{error.toString()}</p>}
                    <Field>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing up...' : 'Sign Up'}
                      </Button>
                      <FieldDescription className="text-center">
                        Already have an account? <a href="/login">Login</a>
                      </FieldDescription>
                    </Field>
                  </>
                )}
              />
            </form>
          </FieldGroup>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
