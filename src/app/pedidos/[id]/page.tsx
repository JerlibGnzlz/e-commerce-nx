import { Header } from "@/components/header"
import { DetallePedido } from "@/components/usuario/detalle-pedido"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

interface PedidoPageProps {
    params: {
        id: string
    }
}

export default async function PedidoPage({ params }: PedidoPageProps) {
    const session = await auth()

    if (!session?.user) {
        redirect("/auth/login")
    }

    const pedidoId = Number.parseInt(params.id)

    if (isNaN(pedidoId)) {
        redirect("/pedidos")
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">
                <div className="max-w-4xl mx-auto">
                    <DetallePedido pedidoId={pedidoId} />
                </div>
            </main>
        </div>
    )
}

