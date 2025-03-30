"use client"

import { useState } from "react"
// import { signIn } from "next-auth/react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "../../../auth"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true)
            await signIn("google", { callbackUrl: "/" })
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error al iniciar sesión con Google.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
                <CardDescription>Inicia sesión con tu cuenta de Google para continuar</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading} className="w-full">
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                            Cargando...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <FcGoogle className="mr-2 h-5 w-5" />
                            Continuar con Google
                        </span>
                    )}
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center text-sm text-muted-foreground">
                <p>Al iniciar sesión, aceptas nuestros términos y condiciones.</p>
            </CardFooter>
        </Card>
    )
}

