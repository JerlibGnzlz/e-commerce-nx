import { Header } from "@/components/header"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthErrorPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8 flex flex-col items-center justify-center">
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Error de autenticación</CardTitle>
                        <CardDescription>Ha ocurrido un problema durante el proceso de inicio de sesión.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                No se pudo completar el proceso de autenticación. Por favor, intenta nuevamente.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href="/auth/login">Volver a iniciar sesión</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}

