import { mockCarritoOperaciones } from "@/lib/mock-data"
import { addToCartSchema } from "@/types/cart"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const carrito = mockCarritoOperaciones.getCarrito()
        return NextResponse.json(carrito)
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el carrito" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedData = addToCartSchema.safeParse(body)

        if (!validatedData.success) {
            return NextResponse.json({ message: "Datos inválidos", errors: validatedData.error.format() }, { status: 400 })
        }

        const { productoId, cantidad } = validatedData.data

        const carrito = mockCarritoOperaciones.agregarAlCarrito(productoId, cantidad)
        return NextResponse.json(carrito)
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Error al agregar al carrito" }, { status: 500 })
    }
}

export async function DELETE() {
    try {
        const carrito = mockCarritoOperaciones.vaciarCarrito()
        return NextResponse.json(carrito)
    } catch (error) {
        return NextResponse.json({ message: "Error al vaciar el carrito" }, { status: 500 })
    }
}

