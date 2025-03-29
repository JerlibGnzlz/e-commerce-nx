import type { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
    }
}

export interface ClienteFormData {
    nombre: string
    apellido: string
    telefono: string
    direccion: string
    ciudad: string
    codigoPostal: string
    pais: string
}

