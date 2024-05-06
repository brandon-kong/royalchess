import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export default function LoginPage (): JSX.Element {
    return (
        <main className="bg-background flex flex-col items-center justify-center min-h-screen py-2">
            <Input placeholder="Username" />
            <Button>Click me</Button>
        </main>
    )
}