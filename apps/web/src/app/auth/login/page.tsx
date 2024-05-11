import { Input } from '@repo/ui/input';
import { Button, LinkButton } from '@repo/ui/button';
import { Separator } from '@repo/ui/separator';
import { H1, H2, H3, P } from '@repo/ui/typography';

import LoginForm from '@/components/auth/forms/login';

import { GoogleButton, LichessButton } from '@/components/auth/buttons';
import Link from 'next/link';
import Image from 'next/image';

import { toast } from 'sonner';

export default function LoginPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element {
    return (
        <main className="bg-background flex flex-col items-center justify-center min-h-screen">
            <div className={'w-full p-8 sm:p-0 flex h-screen'}>
                <div className={'flex-1 flex items-center'}>
                    <div className={'max-w-sm mx-auto w-full'}>
                        <div className={'mb-4 space-y-4'}>
                            <H3>Sign in</H3>
                        </div>

                        <div className={'flex flex-col gap-4 w-full'}>
                            <LoginForm />

                            <div
                                className={
                                    'text-sm text-muted-foreground text-center'
                                }
                            >
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
                    </div>
                </div>

                <div
                    className={
                        'hidden lg:block relative flex-1 max-w-3xl w-full bg-yellow-300 h-full'
                    }
                >
                    <Image
                        src={'/images/isometric-chess.webp'}
                        alt={'Isometric chess board'}
                        fill
                        priority
                        sizes={'100vw'}
                        draggable={false}
                        className={
                            'select-none w-full object-contain max-w-md xl:max-w-lg mx-auto'
                        }
                    />
                </div>
            </div>
        </main>
    );
}
