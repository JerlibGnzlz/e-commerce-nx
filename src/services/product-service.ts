"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchApi } from "@/app/lib/fetch-api"
import { Producto } from "@/types/cart"
// import type { Product } from "@/types/cart"

// Query keys
export const productKeys = {
    all: ["products"] as const,
    lists: () => [...productKeys.all, "list"] as const,
    detail: (id: string) => [...productKeys.all, "detail", id] as const,
}

// Hooks
export function useProducts() {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: () => fetchApi<Producto[]>("/products"),
    })
}

