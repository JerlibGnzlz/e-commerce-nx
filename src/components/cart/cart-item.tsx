"use client"

import type { CartItem as CartItemType } from "@/types/cart"
import { useRemoveFromCart, useUpdateCartItem } from "@/services/cart-service"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface CartItemProps {
    item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
    const { mutate: updateItem, isPending: isUpdating } = useUpdateCartItem()
    const { mutate: removeItem, isPending: isRemoving } = useRemoveFromCart()

    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity < 1) return
        updateItem({ itemId: item.id, quantity: newQuantity })
    }

    const handleRemoveItem = () => {
        removeItem(item.id)
    }

    return (
        <div className="flex items-center space-x-4 py-4 border-b">
            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image src={item.product.image || "/placeholder.svg"} alt={item.product.name} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleUpdateQuantity(item.quantity - 1)}
                    disabled={isUpdating || item.quantity <= 1}
                >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                </Button>

                <span className="w-8 text-center">{item.quantity}</span>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleUpdateQuantity(item.quantity + 1)}
                    disabled={isUpdating}
                >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                </Button>
            </div>

            <div className="text-right min-w-[80px]">
                <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={handleRemoveItem}
                disabled={isRemoving}
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
            </Button>
        </div>
    )
}

