import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./db/schema"

// Conexión a la base de datos
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
export const db = drizzle(client, { schema })

