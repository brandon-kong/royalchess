'use client';

import React from 'react';
import { SocialButton, type ButtonProps } from '@repo/ui/button';
import Image from 'next/image';

import { signIn, signOut } from 'next-auth/react';

type SocialButtonType = typeof SocialButton;

const GoogleButton: SocialButtonType = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({ ...props }, ref) => {
    const handleSignIn = async () => {
        const res = await signIn('google', {
            redirect: false,
        });
    };
    return (
        <SocialButton onClick={handleSignIn} {...props}>
            <Image
                src="/logos/google.svg"
                alt="Google"
                width={24}
                height={24}
            />
            Sign in with Google
        </SocialButton>
    );
});
GoogleButton.displayName = 'GoogleButton';

const LichessButton: SocialButtonType = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({ ...props }, ref) => {
    const handleSignIn = async () => {
        const res = await signIn('lichess', {
            redirect: false,
        });
    };
    return (
        <SocialButton onClick={handleSignIn} {...props}>
            <Image
                src="/logos/lichess.svg"
                alt="Lichess"
                width={32}
                height={32}
            />
            Sign in with Lichess
        </SocialButton>
    );
});

const LogoutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ ...props }, ref) => {
        const handleSignOut = async () => {
            const res = await signOut();
        };
        return (
            <SocialButton onClick={handleSignOut} {...props}>
                Sign out
            </SocialButton>
        );
    },
);

export { GoogleButton, LichessButton, LogoutButton };
