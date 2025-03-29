import { z } from "zod"

// Esquema de validación para el producto
export const productoSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string().optional(),
    precio: z.number(),
    imagen: z.string().optional(),
    stock: z.number(),
})

// Esquema de validación para el item del carrito
export const cartItemSchema = z.object({
    id: z.string(),
    productoId: z.number(),
    cantidad: z.number().min(1),
    producto: productoSchema,
})

// Esquema de validación para el carrito
export const cartSchema = z.object({
    items: z.array(cartItemSchema),
    totalItems: z.number(),
    totalPrecio: z.number(),
})

// Tipos derivados de los esquemas
export type Producto = z.infer<typeof productoSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = z.infer<typeof cartSchema>

// Esquemas para las solicitudes de API
export const addToCartSchema = z.object({
    productoId: z.number(),
    cantidad: z.number().min(1).default(1),
})

export const updateCartItemSchema = z.object({
    itemId: z.string(),
    cantidad: z.number().min(1),
})

export type AddToCartInput = z.infer<typeof addToCartSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>

