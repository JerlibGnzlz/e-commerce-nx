// import { mockCartOperations } from "@/lib/mock-data"
import { mockCarritoOperaciones } from "@/app/lib/mock-data"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const products = mockCarritoOperaciones.getProductos()
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 })
    }
}

