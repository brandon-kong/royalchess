import Image from 'next/image';
import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';
import { Button } from '@repo/ui/button';

export default function Page(): JSX.Element {
    return (
        <main className="bg-background flex flex-col items-center justify-center min-h-screen py-2">
            <Button>Click me</Button>
        </main>
    );
}
