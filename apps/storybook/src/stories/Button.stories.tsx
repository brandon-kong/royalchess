import { Fragment } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, SocialButton } from '@repo/ui/button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
    title: 'Design System/royalchess/Button',
    component: Button,

    tags: ['autodocs'],

    argTypes: {
        variant: {
            control: 'select',
            options: [
                'default',
                'secondary',
                'outline',
                'ghost',
                'destructive',
                'link',
            ],
        },
        size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        onClick: fn(),
        children: 'Button',
        size: 'lg',
    },

    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'default',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
    },
};

export const Destructive: Story = {
    args: {
        variant: 'destructive',
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
    },
};

export const Icon: Story = {
    args: {
        size: 'icon',
        children: '🚀',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const SocialAuthButtons: Story = {
    render: (args) => (
        <Fragment>
            <SocialButton {...args}>
                <img src="/vite.svg" alt="Google" className={'w-6 h-6'} />
                {args.children} Google
            </SocialButton>
        </Fragment>
    ),
    args: {
        children: 'Sign in with',
    },
};
