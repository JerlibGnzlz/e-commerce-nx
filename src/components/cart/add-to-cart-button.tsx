"use client"

import { Button } from "@/components/ui/button"
import { useAddToCart } from "@/services/cart-service"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
    productId: string
    quantity?: number
    variant?: "default" | "outline" | "secondary"
    size?: "default" | "sm" | "lg" | "icon"
    className?: string
}

export function AddToCartButton({
    productId,
    quantity = 1,
    variant = "default",
    size = "default",
    className,
}: AddToCartButtonProps) {
    const { mutate: addToCart, isPending } = useAddToCart()

    const handleAddToCart = () => {
        addToCart({ productId, quantity })
    }

    return (
        <Button variant={variant} size={size} onClick={handleAddToCart} disabled={isPending} className={className}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isPending ? "Adding..." : "Add to cart"}
        </Button>
    )
}

