"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchApi } from "@/lib/fetch-api"
import type { Product } from "@/types/cart"

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
        queryFn: () => fetchApi<Product[]>("/products"),
    })
}

