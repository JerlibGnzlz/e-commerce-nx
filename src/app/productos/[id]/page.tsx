import { Header } from "@/components/header"
import { DetalleProducto } from "@/components/detalle-producto"

interface ProductoPageProps {
    params: {
        id: string
    }
}

export default function ProductoPage({ params }: ProductoPageProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">
                <DetalleProducto productoId={Number.parseInt(params.id)} />
            </main>
        </div>
    )
}

