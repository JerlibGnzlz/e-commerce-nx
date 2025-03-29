"use client"

import type { Cart } from "@/types/cart"
import { Button } from "@/components/ui/button"
import { useClearCart } from "@/services/cart-service"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CartSummaryProps {
    cart: Cart
}

export function CartSummary({ cart }: CartSummaryProps) {
    const { mutate: clearCart, isPending } = useClearCart()

    const handleClearCart = () => {
        clearCart()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(cart.totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(cart.totalPrice * 1.1).toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">Checkout</Button>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleClearCart}
                    disabled={isPending || cart.items.length === 0}
                >
                    {isPending ? "Clearing..." : "Clear Cart"}
                </Button>
            </CardFooter>
        </Card>
    )
}

