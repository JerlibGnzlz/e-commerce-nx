"use client"

import { usePedidosUsuario } from "@/services/usuario-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import { ShoppingBag, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ListaPedidos() {
    const { data: pedidos, isLoading, error } = usePedidosUsuario()

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index}>
                        <CardHeader className="pb-2">
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <div className="mt-4">
                                <Skeleton className="h-10 w-28" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>No se pudieron cargar tus pedidos. Por favor, intenta nuevamente más tarde.</AlertDescription>
            </Alert>
        )
    }

    if (!pedidos || pedidos.length === 0) {
        return (
            <div className="text-center py-12 space-y-4">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                <h2 className="text-xl font-semibold">No tienes pedidos realizados</h2>
                <p className="text-muted-foreground">Cuando realices un pedido, aparecerá aquí.</p>
                <Button asChild className="mt-4">
                    <Link href="/">Explorar productos</Link>
                </Button>
            </div>
        )
    }

    const getEstadoBadgeVariant = (estado: string) => {
        switch (estado) {
            case "Pendiente":
                return "outline"
            case "En curso":
                return "secondary"
            case "Enviado":
                return "default"
            case "Entregado":
                return "success"
            case "Cancelado":
                return "destructive"
            default:
                return "outline"
        }
    }

    return (
        <div className="space-y-4">
            {pedidos.map((pedido) => (
                <Card key={pedido.id}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Pedido #{pedido.id}</CardTitle>
                            <Badge variant={getEstadoBadgeVariant(pedido.estado)}>{pedido.estado}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">
                                {pedido.fecha
                                    ? formatDistanceToNow(new Date(pedido.fecha), {
                                        addSuffix: true,
                                        locale: es,
                                    })
                                    : "Fecha no disponible"}
                            </span>
                            <span className="font-medium">${Number(pedido.total).toFixed(2)}</span>
                        </div>
                        <div className="mt-4">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/pedidos/${pedido.id}`}>Ver detalles</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

