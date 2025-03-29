import { db } from "@/lib/db"
import { cliente } from "@/lib/db/schema"
import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 })
        }

        const userId = session.user.id

        // Buscar el perfil del cliente
        const clienteData = await db.query.cliente.findFirst({
            where: eq(cliente.userId, userId),
        })

        if (!clienteData) {
            return NextResponse.json({ message: "Perfil no encontrado" }, { status: 404 })
        }

        return NextResponse.json(clienteData)
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener el perfil" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ message: "No autorizado" }, { status: 401 })
        }

        const userId = session.user.id
        const body = await request.json()

        // Validar los datos del formulario
        if (!body.nombre) {
            return NextResponse.json({ message: "El nombre es obligatorio" }, { status: 400 })
        }

        // Buscar si el cliente ya existe
        const existingCliente = await db.query.cliente.findFirst({
            where: eq(cliente.userId, userId),
        })

        if (existingCliente) {
            // Actualizar cliente existente
            const updatedCliente = await db
                .update(cliente)
                .set({
                    nombre: body.nombre,
                    apellido: body.apellido,
                    telefono: body.telefono,
                    direccion: body.direccion,
                    ciudad: body.ciudad,
                    codigoPostal: body.codigoPostal,
                    pais: body.pais,
                    updatedAt: new Date(),
                })
                .where(eq(cliente.userId, userId))
                .returning()

            return NextResponse.json(updatedCliente[0])
        } else {
            // Crear nuevo cliente
            const newCliente = await db
                .insert(cliente)
                .values({
                    userId,
                    nombre: body.nombre,
                    apellido: body.apellido,
                    telefono: body.telefono,
                    direccion: body.direccion,
                    ciudad: body.ciudad,
                    codigoPostal: body.codigoPostal,
                    pais: body.pais,
                })
                .returning()

            return NextResponse.json(newCliente[0])
        }
    } catch (error) {
        return NextResponse.json({ message: "Error al actualizar el perfil" }, { status: 500 })
    }
}

