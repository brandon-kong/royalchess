import { Input } from '@repo/ui/input';
import { Button, LinkButton } from '@repo/ui/button';
import { Separator } from '@repo/ui/separator';
import { H1, H2, H3, P } from '@repo/ui/typography';

import RegisterForm from '@/components/auth/forms/register';

import { GoogleButton, LichessButton } from '@/components/auth/buttons';
import Link from 'next/link';
import Image from 'next/image';

export default function VerifyAccountPage(): JSX.Element {
    return (
        <main className="bg-background flex flex-col items-center justify-center min-h-screen">
            <div className={'w-full p-8 sm:p-0 flex h-screen'}>
                <div
                    className={
                        'max-w-lg flex flex-row items-center justify-center mx-auto gap-12'
                    }
                >
                    <div
                        className={
                            'flex flex-col-reverse md:flex-row w-full gap-12 items-center justify-center'
                        }
                    >
                        <div className={'max-w-lg w-full'}>
                            <div className={'space-y-4'}>
                                <H2>Verify your email</H2>

                                <P>
                                    We have sent you an email with a link to
                                    verify your account. Please check your inbox
                                    and click the link to verify your account.
                                </P>

                                <P>
                                    If you did not receive the email, please
                                    check your spam folder or{' '}
                                    <Link
                                        className={'text-yellow-600 underline'}
                                        href={'/auth/resend-verification-email'}
                                    >
                                        resend
                                    </Link>{' '}
                                    the email.
                                </P>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
