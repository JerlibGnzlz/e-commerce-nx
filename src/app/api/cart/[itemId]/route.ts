import { mockCartOperations } from "@/lib/mock-data"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { itemId: string } }) {
    try {
        const { quantity } = await request.json()
        const { itemId } = params

        if (quantity === undefined) {
            return NextResponse.json({ message: "Quantity is required" }, { status: 400 })
        }

        const cart = mockCartOperations.updateCartItem(itemId, quantity)
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json({ message: "Failed to update cart item" }, { status: 500 })
    }
}

export async function DELETE(_request: Request, { params }: { params: { itemId: string } }) {
    try {
        const { itemId } = params
        const cart = mockCartOperations.removeFromCart(itemId)
        return NextResponse.json(cart)
    } catch (error) {
        return NextResponse.json({ message: "Failed to remove item from cart" }, { status: 500 })
    }
}

