import type { Producto, Cart } from "@/types/cart"

// Productos de ejemplo
export const productos: Producto[] = [
    {
        id: 1,
        nombre: "Laptop Pro",
        descripcion: "Laptop de alta gama para profesionales",
        precio: 1299.99,
        imagen: "/placeholder.svg?height=200&width=200",
        stock: 10,
    },
    {
        id: 2,
        nombre: "Smartphone Ultra",
        descripcion: "Smartphone con la última tecnología",
        precio: 899.99,
        imagen: "/placeholder.svg?height=200&width=200",
        stock: 15,
    },
    {
        id: 3,
        nombre: "Auriculares Inalámbricos",
        descripcion: "Auriculares con cancelación de ruido",
        precio: 199.99,
        imagen: "/placeholder.svg?height=200&width=200",
        stock: 20,
    },
    {
        id: 4,
        nombre: "Monitor 4K",
        descripcion: "Monitor de alta resolución para diseñadores",
        precio: 499.99,
        imagen: "/placeholder.svg?height=200&width=200",
        stock: 8,
    },
]

// Estado inicial del carrito
let cart: Cart = {
    items: [],
    totalItems: 0,
    totalPrecio: 0,
}

// Función para recalcular los totales del carrito
const recalcularCarrito = () => {
    cart.totalItems = cart.items.reduce((total, item) => total + item.cantidad, 0)
    cart.totalPrecio = cart.items.reduce((total, item) => {
        return total + item.producto.precio * item.cantidad
    }, 0)
}

// Operaciones del carrito
export const mockCarritoOperaciones = {
    // Obtener el carrito
    getCarrito: (): Cart => {
        return { ...cart }
    },

    // Añadir producto al carrito
    agregarAlCarrito: (productoId: number, cantidad = 1): Cart => {
        const producto = productos.find((p) => p.id === productoId)
        if (!producto) {
            throw new Error("Producto no encontrado")
        }

        // Verificar stock
        if (producto.stock < cantidad) {
            throw new Error("No hay suficiente stock disponible")
        }

        const itemExistente = cart.items.find((item) => item.productoId === productoId)

        if (itemExistente) {
            // Verificar que la nueva cantidad no exceda el stock
            if (itemExistente.cantidad + cantidad > producto.stock) {
                throw new Error("No hay suficiente stock disponible")
            }

            // Actualizar cantidad
            itemExistente.cantidad += cantidad
        } else {
            // Añadir nuevo item
            cart.items.push({
                id: `cart-item-${Date.now()}`,
                productoId,
                cantidad,
                producto,
            })
        }

        recalcularCarrito()
        return { ...cart }
    },

    // Actualizar item del carrito
    actualizarItemCarrito: (itemId: string, cantidad: number): Cart => {
        const itemIndex = cart.items.findIndex((item) => item.id === itemId)

        if (itemIndex === -1) {
            throw new Error("Item no encontrado en el carrito")
        }

        const item = cart.items[itemIndex]
        const producto = productos.find((p) => p.id === item.productoId)

        if (!producto) {
            throw new Error("Producto no encontrado")
        }

        // Verificar stock
        if (cantidad > producto.stock) {
            throw new Error("No hay suficiente stock disponible")
        }

        // Actualizar cantidad
        cart.items[itemIndex].cantidad = cantidad

        recalcularCarrito()
        return { ...cart }
    },

    // Eliminar item del carrito
    eliminarDelCarrito: (itemId: string): Cart => {
        cart.items = cart.items.filter((item) => item.id !== itemId)
        recalcularCarrito()
        return { ...cart }
    },

    // Vaciar carrito
    vaciarCarrito: (): Cart => {
        cart = {
            items: [],
            totalItems: 0,
            totalPrecio: 0,
        }

        return { ...cart }
    },

    // Obtener productos
    getProductos: (): Producto[] => {
        return [...productos]
    },

    // Obtener producto por ID
    getProductoPorId: (id: number): Producto | undefined => {
        return productos.find((p) => p.id === id)
    },
}

