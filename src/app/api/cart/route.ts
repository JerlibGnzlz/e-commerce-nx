import { mockCartOperations } from "@/lib/mock-data"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const cart = mockCartOperations.getCart()
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch cart" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { productId, quantity } = await request.json()

        if (!productId) {
            return NextResponse.json({ message: "Product ID is required" }, { status: 400 })
        }

        const cart = mockCartOperations.addToCart(productId, quantity || 1)
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json({ message: "Failed to add item to cart" }, { status: 500 })
    }
}

export async function DELETE() {
    try {
        const cart = mockCartOperations.clearCart()
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json({ message: "Failed to clear cart" }, { status: 500 })
    }
}

