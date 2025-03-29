"use client"

import type { Product } from "@/types/cart"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <Link href={`/products/${product.id}`} className="block relative h-48 w-full">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </Link>
            </CardHeader>
            <CardContent className="p-4">
                <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-muted-foreground mt-1">${product.price.toFixed(2)}</p>
                </Link>
                <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <AddToCartButton productId={product.id} className="w-full" />
            </CardFooter>
        </Card>
    )
}

