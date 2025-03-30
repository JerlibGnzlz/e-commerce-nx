import { mockCarritoOperaciones } from "@/app/lib/mock-data"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const productos = mockCarritoOperaciones.getProductos()
        return NextResponse.json(productos)
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener productos" }, { status: 500 })
    }
}

