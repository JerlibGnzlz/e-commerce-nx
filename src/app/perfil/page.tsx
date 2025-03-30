import { Header } from "@/components/header"
import { PerfilForm } from "@/components/usuario/perfil-form"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { auth } from "../../../auth"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"

export default async function PerfilPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/auth/login")
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-0.5">
                        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
                        <p className="text-muted-foreground">Administra tu información personal y preferencias de cuenta.</p>
                    </div>

                    <Separator className="my-6" />

                    <Tabs defaultValue="informacion" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="informacion">Información Personal</TabsTrigger>
                            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
                        </TabsList>

                        <TabsContent value="informacion">
                            <PerfilForm />
                        </TabsContent>

                        <TabsContent value="seguridad">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Seguridad</CardTitle>
                                    <CardDescription>Gestiona la seguridad de tu cuenta.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Tu cuenta está vinculada a Google. Para cambiar tu contraseña o configuración de seguridad, debes
                                        hacerlo a través de tu cuenta de Google.
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}

