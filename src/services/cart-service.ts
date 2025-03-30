"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchApi } from "@/app/lib/fetch-api"
import type { Cart } from "@/types/cart"
import { useToast } from "@/hooks/use-toast"
// import { useToast } from "@/hooks/use-toast"

// Query keys
export const cartKeys = {
    all: ["cart"] as const,
    detail: () => [...cartKeys.all, "detail"] as const,
}

// Hooks
export function useCart() {
    return useQuery({
        queryKey: cartKeys.detail(),
        queryFn: () => fetchApi<Cart>("/cart"),
    })
}

export function useAddToCart() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: ({ productId, quantity = 1 }: { productId: string; quantity?: number }) =>
            fetchApi<Cart>("/cart", {
                method: "POST",
                body: { productId, quantity },
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(cartKeys.detail(), data)
            toast({
                title: "Item added to cart",
                description: "Your item has been added to the cart successfully.",
            })
        },
        onError: (error) => {
            toast({
                title: "Failed to add item",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            })
        },
    })
}

export function useUpdateCartItem() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
            fetchApi<Cart>(`/cart/${itemId}`, {
                method: "PUT",
                body: { quantity },
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(cartKeys.detail(), data)
            toast({
                title: "Cart updated",
                description: "Your cart has been updated successfully.",
            })
        },
        onError: (error) => {
            toast({
                title: "Failed to update cart",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            })
        },
    })
}

export function useRemoveFromCart() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: (itemId: string) =>
            fetchApi<Cart>(`/cart/${itemId}`, {
                method: "DELETE",
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(cartKeys.detail(), data)
            toast({
                title: "Item removed",
                description: "The item has been removed from your cart.",
            })
        },
        onError: (error) => {
            toast({
                title: "Failed to remove item",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            })
        },
    })
}

export function useClearCart() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: () =>
            fetchApi<Cart>("/cart", {
                method: "DELETE",
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(cartKeys.detail(), data)
            toast({
                title: "Cart cleared",
                description: "Your cart has been cleared successfully.",
            })
        },
        onError: (error) => {
            toast({
                title: "Failed to clear cart",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            })
        },
    })
}

