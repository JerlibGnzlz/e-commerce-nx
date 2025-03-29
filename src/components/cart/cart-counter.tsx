"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/services/cart-service"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function CartCounter() {
    const { data: cart, isLoading } = useCart()

    return (
        <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {!isLoading && cart && cart.totalItems > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                        {cart.totalItems}
                    </Badge>
                )}
                <span className="sr-only">Cart</span>
            </Link>
        </Button>
    )
}

