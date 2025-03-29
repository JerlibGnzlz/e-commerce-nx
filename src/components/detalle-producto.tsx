"use client"

import { useProducto } from "@/services/carrito-service"
import { BotonAgregarCarrito } from "@/components/carrito/boton-agregar-carrito"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface DetalleProductoProps {
    productoId: number
}

export function DetalleProducto({ productoId }: DetalleProductoProps) {
    const { data: producto, isLoading, error } = useProducto(productoId)
    const [cantidad, setCantidad] = useState(1)

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        )
    }

    if (error || !producto) {
        return (
            <div className="text-center py-12">
                <p className="text-destructive">Error al cargar el producto</p>
                <Button asChild variant="outline" className="mt-4">
                    <Link href="/">Volver a Productos</Link>
                </Button>
            </div>
        )
    }

    const handleCantidadChange = (value: number) => {
        if (value >= 1 && value <= producto.stock) {
            setCantidad(value)
        }
    }

    return (
        <div>
            <Button asChild variant="ghost" className="mb-6">
                <Link href="/">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Volver a Productos
                </Link>
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-cover" />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{producto.nombre}</h1>
                        <p className="text-2xl font-semibold mt-2">${producto.precio.toFixed(2)}</p>
                    </div>

                    <p className="text-muted-foreground">{producto.descripcion}</p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">Cantidad:</span>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-r-none"
                                    onClick={() => handleCantidadChange(cantidad - 1)}
                                    disabled={cantidad <= 1}
                                >
                                    -
                                </Button>
                                <div className="h-8 w-12 flex items-center justify-center border-y">{cantidad}</div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-l-none"
                                    onClick={() => handleCantidadChange(cantidad + 1)}
                                    disabled={cantidad >= producto.stock}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {producto.stock > 0 ? (
                                <span>Disponible: {producto.stock} unidades</span>
                            ) : (
                                <span className="text-destructive">Agotado</span>
                            )}
                        </div>

                        <BotonAgregarCarrito
                            productoId={producto.id}
                            cantidad={cantidad}
                            className="w-full"
                            disabled={producto.stock === 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

