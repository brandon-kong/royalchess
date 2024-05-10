'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { InputWithLabel } from '@repo/ui/input';
import { Button, LinkButton } from '@repo/ui/button';
import type { LoginForm } from '@/types/forms/auth';
import { signIn } from 'next-auth/react';

export default function LoginForm(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={'flex flex-col gap-4 w-full'}
        >
            <InputWithLabel
                error={errors.email !== undefined}
                label="Email"
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
            />

            <InputWithLabel
                error={errors.password !== undefined}
                label="Password"
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
            />

            <Button className={'w-full'} type="submit">
                Log in
            </Button>
        </form>
    );
}
