"use client"

import type { Producto } from "@/types/cart"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { BotonAgregarCarrito } from "@/components/carrito/boton-agregar-carrito"
import Image from "next/image"
import Link from "next/link"

interface ProductoCardProps {
    producto: Producto
}

export function ProductoCard({ producto }: ProductoCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <Link href={`/productos/${producto.id}`} className="block relative h-48 w-full">
                    <Image src={producto.imagen || "/placeholder.svg"} alt={producto.nombre} fill className="object-cover" />
                </Link>
            </CardHeader>
            <CardContent className="p-4">
                <Link href={`/productos/${producto.id}`} className="block">
                    <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                    <p className="text-muted-foreground mt-1">${producto.precio.toFixed(2)}</p>
                </Link>
                <p className="text-sm mt-2 line-clamp-2">{producto.descripcion}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <BotonAgregarCarrito productoId={producto.id} className="w-full" />
            </CardFooter>
        </Card>
    )
}

