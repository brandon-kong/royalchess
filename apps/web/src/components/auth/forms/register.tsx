'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { InputWithLabel } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import type { RegisterForm } from '@/types/forms/auth';

import { signIn } from 'next-auth/react';

export default function RegisterForm(): JSX.Element {
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
            redirect: false,
        });

        if (res?.ok) {
            alert('Account created successfully!');
        }
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
                {...register('password', {
                    required: true,
                    minLength: 9,
                })}
            />

            <InputWithLabel
                error={errors.passwordConfirmation !== undefined}
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                {...register('passwordConfirmation', {
                    required: true,
                    validate: (value, data) => value === data.password,
                })}
            />

            <Button className={'w-full'} type="submit">
                Log in
            </Button>
        </form>
    );
}
