"use client"

import type { Cart } from "@/types/cart"
import { Button } from "@/components/ui/button"
import { useVaciarCarrito } from "@/services/carrito-service"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface ResumenCarritoProps {
    carrito: Cart
}

export function ResumenCarrito({ carrito }: ResumenCarritoProps) {
    const { mutate: vaciarCarrito, isPending } = useVaciarCarrito()

    const handleVaciarCarrito = () => {
        vaciarCarrito()
    }

    // Calcular impuestos (10%)
    const impuestos = carrito.totalPrecio * 0.1
    const total = carrito.totalPrecio + impuestos

    return (
        <Card>
            <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${carrito.totalPrecio.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Envío</span>
                    <span>Gratis</span>
                </div>
                <div className="flex justify-between">
                    <span>Impuestos</span>
                    <span>${impuestos.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" asChild>
                    <Link href="/checkout">Proceder al pago</Link>
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleVaciarCarrito}
                    disabled={isPending || carrito.items.length === 0}
                >
                    {isPending ? "Vaciando..." : "Vaciar Carrito"}
                </Button>
            </CardFooter>
        </Card>
    )
}

