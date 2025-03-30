import { mockCarritoOperaciones } from "@/app/lib/mock-data"
import { NextResponse } from "next/server"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const id = Number.parseInt(params.id)
        if (isNaN(id)) {
            return NextResponse.json({ message: "ID de producto inválido" }, { status: 400 })
        }

        const producto = mockCarritoOperaciones.getProductoPorId(id)

        if (!producto) {
            return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 })
        }

        return NextResponse.json(producto)
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el producto" }, { status: 500 })
    }
}

