"use client"

import type { CartItem } from "@/types/cart"
import { useEliminarDelCarrito, useActualizarItemCarrito } from "@/services/carrito-service"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface ItemCarritoProps {
    item: CartItem
}

export function ItemCarrito({ item }: ItemCarritoProps) {
    const { mutate: actualizarItem, isPending: isUpdating } = useActualizarItemCarrito()
    const { mutate: eliminarItem, isPending: isRemoving } = useEliminarDelCarrito()

    const handleActualizarCantidad = (nuevaCantidad: number) => {
        if (nuevaCantidad < 1) return
        actualizarItem({ itemId: item.id, cantidad: nuevaCantidad })
    }

    const handleEliminarItem = () => {
        eliminarItem(item.id)
    }

    return (
        <div className="flex items-center space-x-4 py-4 border-b">
            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                    src={item.producto.imagen || "/placeholder.svg"}
                    alt={item.producto.nombre}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium">{item.producto.nombre}</h3>
                <p className="text-sm text-muted-foreground">${item.producto.precio.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleActualizarCantidad(item.cantidad - 1)}
                    disabled={isUpdating || item.cantidad <= 1}
                >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Disminuir cantidad</span>
                </Button>

                <span className="w-8 text-center">{item.cantidad}</span>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleActualizarCantidad(item.cantidad + 1)}
                    disabled={isUpdating || item.cantidad >= item.producto.stock}
                >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Aumentar cantidad</span>
                </Button>
            </div>

            <div className="text-right min-w-[80px]">
                <p className="text-sm font-medium">${(item.producto.precio * item.cantidad).toFixed(2)}</p>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={handleEliminarItem}
                disabled={isRemoving}
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar item</span>
            </Button>
        </div>
    )
}

