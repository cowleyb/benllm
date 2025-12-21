import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@repo/ui/components/input-group';

export function PasswordInput({ className, ...props }: React.ComponentProps<typeof InputGroupInput>) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <InputGroup className={className}>
      <InputGroupInput type={isVisible ? 'text' : 'password'} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton type="button" variant="ghost" size="icon-xs" onClick={() => setIsVisible(!isVisible)} aria-label={isVisible ? 'Hide password' : 'Show password'}>
          {isVisible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
