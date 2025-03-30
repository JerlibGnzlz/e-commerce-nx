import { db } from "@/app/lib/db"
import { pedido } from "@/app/lib/schema"
// import { auth } from "@/auth"
// import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { auth } from "../../../../../../auth"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 })
        }

        const userId = session.user.id
        const pedidoId = Number.parseInt(params.id)

        if (isNaN(pedidoId)) {
            return NextResponse.json({ message: "ID de pedido inválido" }, { status: 400 })
        }

        // Obtener el pedido específico del usuario
        const pedidoData = await db.query.pedido.findFirst({
            where: and(eq(pedido.id, pedidoId), eq(pedido.userId, userId)),
            with: {
                detalles: {
                    with: {
                        producto: true,
                    },
                },
            },
        })

        if (!pedidoData) {
            return NextResponse.json({ message: "Pedido no encontrado" }, { status: 404 })
        }

        return NextResponse.json(pedidoData)
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el pedido" }, { status: 500 })
    }
}

function eq(id: any, pedidoId: number): any {
    throw new Error("Function not implemented.")
}

function and(arg0: any, arg1: any) {
    throw new Error("Function not implemented.")
}

