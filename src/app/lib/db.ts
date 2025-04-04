// import { drizzle } from "drizzle-orm/postgres-js"
// import postgres from "postgres"
// import * as schema from "./db/schema"

// // Conexión a la base de datos
// const connectionString = process.env.DATABASE_URL!
// const client = postgres(connectionString)
// export const db = drizzle(client, { schema })

import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
import "dotenv/config"
import { neon } from "@neondatabase/serverless"

// Usar la variable de entorno para la conexión
const connectionString = process.env.DATABASE_URL || ""

const sql = neon(connectionString)

export const db = drizzle(sql, { schema }) // Conectar Drizzle con el esquema


