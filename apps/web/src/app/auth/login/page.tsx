import { Input } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import { Separator } from '@repo/ui/separator';
import { H1, H2, H3, P } from '@repo/ui/typography';

import LoginForm from '@/components/forms/auth/login';

import {
    GoogleButton,
    LichessButton,
} from '@/components/forms/auth/social-buttons';

export default function LoginPage(): JSX.Element {
    return (
        <main className="bg-background flex flex-col items-center justify-center min-h-screen py-2">
            <div className={'w-full max-w-sm flex flex-col gap-4'}>
                <div className={'mb-6 space-y-4'}>
                    <H2>Sign in</H2>
                    <P className={'text-muted-foreground'}>
                        Get back into the game and continue your journey with
                        RoyalChess.
                    </P>
                </div>

                <LoginForm />

                <div className="w-full flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <Separator />
                    <span>or</span>
                    <Separator />
                </div>

                <GoogleButton />
                <LichessButton />
            </div>
        </main>
    );
}
