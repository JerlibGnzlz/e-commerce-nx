"use client"

import { Button } from "@/components/ui/button"
import { useAgregarAlCarrito } from "@/services/carrito-service"
import { ShoppingCart } from "lucide-react"

interface BotonAgregarCarritoProps {
    productoId: number
    cantidad?: number
    variant?: "default" | "outline" | "secondary"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
}

export function BotonAgregarCarrito({
    productoId,
    cantidad = 1,
    variant = "default",
    size = "default",
    className,
}: BotonAgregarCarritoProps) {
    const { mutate: agregarAlCarrito, isPending } = useAgregarAlCarrito()

    const handleAgregarAlCarrito = () => {
        agregarAlCarrito({ productoId, cantidad })
    }

    return (
        <Button variant={variant} size={size} onClick={handleAgregarAlCarrito} disabled={isPending} className={className}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isPending ? "Agregando..." : "Agregar al carrito"}
        </Button>
    )
}

