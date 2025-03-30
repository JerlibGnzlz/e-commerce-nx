import { db } from "@/app/lib/db"
import { pedido } from "@/app/lib/schema"
// import { auth } from "@/auth"
// import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { auth } from "../../../../../auth"

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 })
        }

        const userId = session.user.id

        // Obtener todos los pedidos del usuario
        const pedidos = await db.query.pedido.findMany({
            where: eq(pedido.userId, userId),
            orderBy: (pedido: { fecha: any }, { desc }: any) => [desc(pedido.fecha)],
            with: {
                detalles: {
                    with: {
                        producto: true,
                    },
                },
            },
        })

        return NextResponse.json(pedidos)
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener los pedidos" }, { status: 500 })
    }
}

function eq(userId: any, userId1: any) {
    throw new Error("Function not implemented.")
}

