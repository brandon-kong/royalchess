import { Input } from '@repo/ui/input';
import { Button, LinkButton } from '@repo/ui/button';
import { Separator } from '@repo/ui/separator';
import { H1, H2, H3, P } from '@repo/ui/typography';

import LoginForm from '@/components/auth/forms/login';

import { GoogleButton, LichessButton } from '@/components/auth/buttons';
import Link from 'next/link';

export default function LoginPage(): JSX.Element {
    return (
        <main className="bg-background flex flex-col items-center justify-center min-h-screen py-2">
            <div className={'w-full max-w-sm flex flex-col gap-4 p-8 sm:p-0'}>
                <div className={'mb-6 space-y-4'}>
                    <H2>Sign in</H2>
                    <P className={'text-muted-foreground'}>
                        Get back into the game and continue your journey with
                        RoyalChess.
                    </P>
                </div>

                <LoginForm />

                <div className={'text-sm text-muted-foreground text-center'}>
                    Don&apos;t have an account?{' '}
                    <Button
                        variant={'link'}
                        className={'text-primary w-fit h-fit p-0'}
                    >
                        <Link href="/auth/register">Register</Link>
                    </Button>
                </div>

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
