"use client"

import { useCart } from "@/services/cart-service"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export function CartContent() {
    const { data: cart, isLoading, error } = useCart()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center space-x-4 py-4 border-b">
                            <Skeleton className="h-16 w-16 rounded-md" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                            <Skeleton className="h-8 w-24" />
                        </div>
                    ))}
                </div>
                <div>
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-destructive">Failed to load cart</p>
            </div>
        )
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="text-center py-12 space-y-4">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-4">
                    <Link href="/">Browse Products</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {cart.items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            <div>
                <CartSummary cart={cart} />
            </div>
        </div>
    )
}

