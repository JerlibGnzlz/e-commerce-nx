import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text, timestamp, decimal, pgEnum, varchar } from "drizzle-orm/pg-core"

// Enum para el estado del pedido
export const estadoPedidoEnum = pgEnum("estado_pedido", ["Pendiente", "En curso", "Enviado", "Entregado", "Cancelado"])

// Tabla de usuarios para Auth.js
export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
})

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    sessionToken: text("session_token").notNull().unique(),
})

export const verificationTokens = pgTable("verification_tokens", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

// Tabla Cliente (extendida con información adicional del usuario)
export const cliente = pgTable("cliente", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    nombre: text("nombre").notNull(),
    apellido: text("apellido"),
    telefono: varchar("telefono", { length: 20 }),
    direccion: text("direccion"),
    ciudad: text("ciudad"),
    codigoPostal: varchar("codigo_postal", { length: 10 }),
    pais: text("pais"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabla Producto
export const producto = pgTable("producto", {
    id: serial("id").primaryKey(),
    nombre: text("nombre").notNull(),
    descripcion: text("descripcion"),
    precio: decimal("precio", { precision: 10, scale: 2 }).notNull(),
    imagen: text("imagen"),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabla Pedido
export const pedido = pgTable("pedido", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
    clienteId: integer("cliente_id").references(() => cliente.id),
    fecha: timestamp("fecha").defaultNow(),
    estado: estadoPedidoEnum("estado").default("Pendiente"),
    total: decimal("total", { precision: 10, scale: 2 }).default("0"),
    direccionEnvio: text("direccion_envio"),
    metodoPago: text("metodo_pago"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Tabla DetallePedido
export const detallePedido = pgTable("detalle_pedido", {
    id: serial("id").primaryKey(),
    pedidoId: integer("pedido_id").references(() => pedido.id, { onDelete: "cascade" }),
    productoId: integer("producto_id").references(() => producto.id),
    cantidad: integer("cantidad").notNull(),
    precioUnitario: decimal("precio_unitario", { precision: 10, scale: 2 }).notNull(),
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

// Relaciones
export const userRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    clientes: many(cliente),
    pedidos: many(pedido),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}))

export const clienteRelations = relations(cliente, ({ one, many }) => ({
    user: one(users, {
        fields: [cliente.userId],
        references: [users.id],
    }),
    pedidos: many(pedido),
}))

export const pedidoRelations = relations(pedido, ({ one, many }) => ({
    user: one(users, {
        fields: [pedido.userId],
        references: [users.id],
    }),
    cliente: one(cliente, {
        fields: [pedido.clienteId],
        references: [cliente.id],
    }),
    detalles: many(detallePedido),
}))

export const detallePedidoRelations = relations(detallePedido, ({ one }) => ({
    pedido: one(pedido, {
        fields: [detallePedido.pedidoId],
        references: [pedido.id],
    }),
    producto: one(producto, {
        fields: [detallePedido.productoId],
        references: [producto.id],
    }),
}))

export const productoRelations = relations(producto, ({ many }) => ({
    detalles: many(detallePedido),
}))

