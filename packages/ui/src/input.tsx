import * as React from 'react';

import { Label } from './label';
import { cn } from '@repo/utils';

import type { FieldError } from 'react-hook-form';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError;
}

export interface InputWithLabelProps extends InputProps {
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error = false, type, ...props }, ref) => {
        return (
            <input
                data-error={error}
                type={type}
                className={cn(
                    'transition-all flex h-12 w-full rounded-md ring-2 ring-offset-1 bg-neutral-200 px-4 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    error ? 'ring-destructive' : 'ring-transparent',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
    ({ className, name, label, type, ...props }, ref) => {
        const error = props.error;
        return (
            <div className="flex flex-col gap-1">
                <Label htmlFor={name}>{label || name || 'Label'}</Label>
                <Input
                    type={type}
                    className={cn('rounded-md', className)}
                    ref={ref}
                    name={name}
                    {...props}
                />
                {error && (
                    <span className="text-sm text-destructive">
                        {error && error.message}
                    </span>
                )}
            </div>
        );
    },
);
InputWithLabel.displayName = 'InputWithLabel';

export { Input, InputWithLabel };
