'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { InputWithLabel } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import type { RegisterForm } from '@/types/forms/auth';

import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterForm(): JSX.Element {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>();

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        const res = await signIn('credentials-register', {
            email: data.email,
            password1: data.password,
            password2: data.passwordConfirmation,
            redirect: true,
        });

        if (!res?.ok) {
            toast.error('Could');
        }

        if (res?.ok) {
            // get the callbackUrl from the searchParams or the next param
            let callbackUrl = searchParams.get('callbackUrl');
            const next = searchParams.get('next') || '/';
            callbackUrl = callbackUrl || next;

            router.push(callbackUrl);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={'flex flex-col gap-4 w-full'}
        >
            <InputWithLabel
                error={errors.email}
                label="Email"
                type="email"
                placeholder="Email"
                {...register('email', {
                    required: { value: true, message: 'Email is required' },
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                })}
            />

            <InputWithLabel
                error={errors.password}
                label="Password"
                type="password"
                placeholder="Password"
                {...register('password', {
                    required: { value: true, message: 'Password is required' },
                    minLength: {
                        value: 9,
                        message: 'Password must be at least 9 characters',
                    },
                })}
            />

            <InputWithLabel
                error={errors.passwordConfirmation}
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                {...register('passwordConfirmation', {
                    required: {
                        value: true,
                        message: 'Password confirmation is required',
                    },
                    validate: (value, data) =>
                        value === data.password || 'Passwords do not match',
                })}
            />

            <Button className={'w-full'} type="submit">
                Log in
            </Button>
        </form>
    );
}
