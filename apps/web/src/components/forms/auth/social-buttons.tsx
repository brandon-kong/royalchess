'use client';

import React from 'react';
import { SocialButton, type ButtonProps } from '@repo/ui/button';
import Image from 'next/image';

type SocialButtonType = typeof SocialButton;

const GoogleButton: SocialButtonType = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({ ...props }, ref) => {
    return (
        <SocialButton onClick={() => console.log('Google')} {...props}>
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
    return (
        <SocialButton onClick={() => console.log('Lichess')} {...props}>
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

export { GoogleButton, LichessButton };
