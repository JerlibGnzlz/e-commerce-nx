"use client"

import { useProductos } from "@/services/carrito-service"
import { ProductoCard } from "@/components/producto-card"
import { Skeleton } from "@/components/ui/skeleton"

export function ListaProductos() {
    const { data: productos, isLoading, error } = useProductos()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="space-y-3">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-destructive">Error al cargar productos</p>
            </div>
        )
    }

    if (!productos || productos.length === 0) {
        return (
            <div className="text-center py-12">
                <p>No hay productos disponibles</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
            ))}
        </div>
    )
}

