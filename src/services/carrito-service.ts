"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchApi } from "@/lib/fetch-api"
import type { Cart, Producto, AddToCartInput, UpdateCartItemInput } from "@/types/cart"
import { useToast } from "@/hooks/use-toast"

// Claves de consulta
export const carritoKeys = {
    all: ["carrito"] as const,
    detail: () => [...carritoKeys.all, "detail"] as const,
}

export const productoKeys = {
    all: ["productos"] as const,
    lists: () => [...productoKeys.all, "list"] as const,
    detail: (id: number) => [...productoKeys.all, "detail", id] as const,
}

// Hooks para el carrito
export function useCarrito() {
    return useQuery({
        queryKey: carritoKeys.detail(),
        queryFn: () => fetchApi<Cart>("/carrito"),
    })
}

export function useAgregarAlCarrito() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: ({ productoId, cantidad = 1 }: AddToCartInput) =>
            fetchApi<Cart>("/carrito", {
                method: "POST",
                body: { productoId, cantidad },
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(carritoKeys.detail(), data)
            toast({
                title: "Producto agregado",
                description: "El producto ha sido agregado al carrito.",
            })
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "No se pudo agregar el producto al carrito.",
                variant: "destructive",
            })
        },
    })
}

export function useActualizarItemCarrito() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: ({ itemId, cantidad }: UpdateCartItemInput) =>
            fetchApi<Cart>(`/carrito/${itemId}`, {
                method: "PUT",
                body: { cantidad },
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(carritoKeys.detail(), data)
            toast({
                title: "Carrito actualizado",
                description: "El carrito ha sido actualizado correctamente.",
            })
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "No se pudo actualizar el carrito.",
                variant: "destructive",
            })
        },
    })
}

export function useEliminarDelCarrito() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: (itemId: string) =>
            fetchApi<Cart>(`/carrito/${itemId}`, {
                method: "DELETE",
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(carritoKeys.detail(), data)
            toast({
                title: "Producto eliminado",
                description: "El producto ha sido eliminado del carrito.",
            })
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "No se pudo eliminar el producto del carrito.",
                variant: "destructive",
            })
        },
    })
}

export function useVaciarCarrito() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: () =>
            fetchApi<Cart>("/carrito", {
                method: "DELETE",
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(carritoKeys.detail(), data)
            toast({
                title: "Carrito vaciado",
                description: "El carrito ha sido vaciado correctamente.",
            })
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "No se pudo vaciar el carrito.",
                variant: "destructive",
            })
        },
    })
}

// Hooks para productos
export function useProductos() {
    return useQuery({
        queryKey: productoKeys.lists(),
        queryFn: () => fetchApi<Producto[]>("/productos"),
    })
}

export function useProducto(id: number) {
    return useQuery({
        queryKey: productoKeys.detail(id),
        queryFn: () => fetchApi<Producto>(`/productos/${id}`),
        enabled: !!id,
    })
}

