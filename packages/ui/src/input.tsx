import * as React from 'react';

import { Label } from './label';
import { cn } from '@repo/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-12 w-full rounded-md bg-neutral-100 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, name, type, ...props }, ref) => {
        return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={name}>{props.placeholder}</Label>
            <Input
                type={type}
                className={cn('rounded-md', className)}
                ref={ref}
                {...props} 
            />
        </div>)
    },
);
InputWithLabel.displayName = 'InputWithLabel';

export { Input, InputWithLabel };
