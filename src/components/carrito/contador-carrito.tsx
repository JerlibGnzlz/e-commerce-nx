"use client"

import { ShoppingCart } from "lucide-react"
import { useCarrito } from "@/services/carrito-service"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function ContadorCarrito() {
    const { data: carrito, isLoading } = useCarrito()

    if (isLoading) {
        return (
            <Button variant="ghost" size="icon" disabled className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Skeleton className="absolute -top-2 -right-2 h-5 w-5 rounded-full" />
            </Button>
        )
    }

    return (
        <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/carrito">
                <ShoppingCart className="h-5 w-5" />
                {carrito && carrito.totalItems > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                        {carrito.totalItems}
                    </Badge>
                )}
                <span className="sr-only">Carrito</span>
            </Link>
        </Button>
    )
}

