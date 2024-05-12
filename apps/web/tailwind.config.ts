import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'presets' | 'content'> = {
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/app/global.css'],
    presets: [sharedConfig],
};

export default config;
