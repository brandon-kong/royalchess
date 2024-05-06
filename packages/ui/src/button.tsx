import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@repo/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap select-none rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                'border border-neutral-300 text-black bg-background hover:bg-accent hover:border-black hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-12 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                xl: 'h-12 rounded-md px-12',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

const ButtonGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                className={cn(
                    'flex gap-2',
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
ButtonGroup.displayName = 'ButtonGroup';

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }), 'flex items-center justify-center')}
                ref={ref}
                {...props}
            />
        );
    },
);
ButtonIcon.displayName = 'ButtonIcon';

const SocialButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, size, asChild = false, ...props }, ref) => {
        return (
            <Button
                className={cn('flex items-center justify-center gap-2', className)}
                variant={'outline'}
                size={size}
                ref={ref}
                {...props}
            />
        );
    },
);


export { Button, ButtonGroup, ButtonIcon, SocialButton, buttonVariants };
