'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, InputWithLabel } from '@repo/ui/input';
import { Button } from '@repo/ui/button';
import type { LoginForm } from '@/types/forms/auth';

export default function LoginForm(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col gap-4 w-full'}
        >
            <InputWithLabel
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
            />
            {errors.email && <span>Email is required</span>}

            <Input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
            />
            {errors.password && <span>Password is required</span>}

            <Button 
            className={'w-full'}
            type="submit">Submit</Button>
        </form>
    );
}