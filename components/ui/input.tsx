import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
  ({ className, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'h-10 native:h-14 rounded-md border border-input bg-background px-3 text-base lg:text-sm native:text-lg native:leading-[1.25] placeholder:text-muted-foreground file:border-0 file:bg-transparent file:font-medium focus:border-primary',
          props.editable === false && 'opacity-50',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
