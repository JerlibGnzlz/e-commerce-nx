"use client"

import { useProducts } from "@/services/product-service"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductDetailProps {
    productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
    const { data: products, isLoading, error } = useProducts()
    const [quantity, setQuantity] = useState(1)

    const product = products?.find((p) => p.id === productId)

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="text-center py-12">
                <p className="text-destructive">Failed to load product</p>
                <Button asChild variant="outline" className="mt-4">
                    <Link href="/">Back to Products</Link>
                </Button>
            </div>
        )
    }

    const handleQuantityChange = (value: number) => {
        if (value >= 1) {
            setQuantity(value)
        }
    }

    return (
        <div>
            <Button asChild variant="ghost" className="mb-6">
                <Link href="/">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Link>
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-2xl font-semibold mt-2">${product.price.toFixed(2)}</p>
                    </div>

                    <p className="text-muted-foreground">{product.description}</p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium">Quantity:</span>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-r-none"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <div className="h-8 w-12 flex items-center justify-center border-y">{quantity}</div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-l-none"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        <AddToCartButton productId={product.id} quantity={quantity} className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

