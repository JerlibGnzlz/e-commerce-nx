import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/header"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8 flex items-center justify-center">
                <LoginForm />
            </main>
        </div>
    )
}

