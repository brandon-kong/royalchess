import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Input, InputWithLabel } from '@repo/ui/input';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof InputWithLabel> = {
    title: 'Design System/royalchess/Input',
    component: Input,

    tags: ['autodocs'],

    argTypes: {
        disabled: {
            description: 'The disabled state of the input',
            control: {
                type: 'boolean',
                disable: false,
            },
        },

        value: {
            control: 'text',
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        onChange: fn(),
        placeholder: 'Type something...',
    },

    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const WithLabel: Story = {
    render: (args) => (
        <InputWithLabel
            {...args}
            label="Label"
        />
    ),
    args: {
        "placeholder": "Type something...",
        label: "Label",
    }
};