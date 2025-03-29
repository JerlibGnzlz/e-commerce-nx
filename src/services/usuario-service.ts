"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchApi } from "@/lib/fetch-api"
import { useToast } from "@/hooks/use-toast"
import type { ClienteFormData } from "@/types/auth"

// Claves de consulta
export const usuarioKeys = {
    all: ["usuario"] as const,
    perfil: () => [...usuarioKeys.all, "perfil"] as const,
    pedidos: () => [...usuarioKeys.all, "pedidos"] as const,
    pedido: (id: number) => [...usuarioKeys.all, "pedido", id] as const,
}

// Hooks para el perfil de usuario
export function usePerfil() {
    return useQuery({
        queryKey: usuarioKeys.perfil(),
        queryFn: () => fetchApi("/usuario/perfil"),
    })
}

export function useActualizarPerfil() {
    const queryClient = useQueryClient()
    const { toast } = useToast()

    return useMutation({
        mutationFn: (data: ClienteFormData) =>
            fetchApi("/usuario/perfil", {
                method: "PUT",
                body: data,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: usuarioKeys.perfil() })
            toast({
                title: "Perfil actualizado",
                description: "Tu información personal ha sido actualizada correctamente.",
            })
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message || "No se pudo actualizar tu información personal.",
                variant: "destructive",
            })
        },
    })
}

// Hooks para los pedidos del usuario
export function usePedidosUsuario() {
    return useQuery({
        queryKey: usuarioKeys.pedidos(),
        queryFn: () => fetchApi("/usuario/pedidos"),
    })
}

export function usePedidoUsuario(id: number) {
    return useQuery({
        queryKey: usuarioKeys.pedido(id),
        queryFn: () => fetchApi(`/usuario/pedidos/${id}`),
        enabled: !!id,
    })
}

