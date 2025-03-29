import { Header } from "@/components/header"
import { ListaPedidos } from "@/components/usuario/lista-pedidos"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"

export default async function PedidosPage() {
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
                        <h1 className="text-3xl font-bold tracking-tight">Mis Pedidos</h1>
                        <p className="text-muted-foreground">Revisa el historial y estado de tus pedidos.</p>
                    </div>

                    <Separator className="my-6" />

                    <ListaPedidos />
                </div>
            </main>
        </div>
    )
}

