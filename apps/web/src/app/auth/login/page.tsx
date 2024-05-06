import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

import LoginForm from "@/components/forms/auth/login";

export default function LoginPage (): JSX.Element {
    return (
        <main className="bg-background flex flex-col items-center justify-center min-h-screen py-2">
            <div
            className={'w-full max-w-sm'}
            >
                <LoginForm />
            </div>
            
        </main>
    )
}