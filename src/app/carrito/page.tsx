import { Header } from "@/components/header"
import { ContenidoCarrito } from "@/components/carrito/contenido-carrito"

export default function CarritoPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">
                <h1 className="text-3xl font-bold mb-6">Tu Carrito de Compras</h1>
                <ContenidoCarrito />
            </main>
        </div>
    )
}

