import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/tailwind.css';
import '@repo/ui/styles.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            theme: themes.light,
        },
    },
};

export const decorators = [
    withThemeByClassName({
        themes: {
            light: 'light',
            dark: 'dark',
        },
        defaultTheme: 'light',
    }),
];

export default preview;
