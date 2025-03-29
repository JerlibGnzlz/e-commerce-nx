import { mockCarritoOperaciones } from "@/lib/mock-data"
import { updateCartItemSchema } from "@/types/cart"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { itemId: string } }) {
    try {
        const { itemId } = params
        const body = await request.json()
        const validatedData = updateCartItemSchema.safeParse({ ...body, itemId })

        if (!validatedData.success) {
            return NextResponse.json({ message: "Datos inválidos", errors: validatedData.error.format() }, { status: 400 })
        }

        const { cantidad } = validatedData.data

        const carrito = mockCarritoOperaciones.actualizarItemCarrito(itemId, cantidad)
        return NextResponse.json(carrito)
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Error al actualizar el item del carrito" }, { status: 500 })
    }
}

export async function DELETE(_request: Request, { params }: { params: { itemId: string } }) {
    try {
        const { itemId } = params
        const carrito = mockCarritoOperaciones.eliminarDelCarrito(itemId)
        return NextResponse.json(carrito)
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar el item del carrito" }, { status: 500 })
    }
}

