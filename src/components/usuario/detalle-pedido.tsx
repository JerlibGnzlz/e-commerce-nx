"use client"

import { usePedidoUsuario } from "@/services/usuario-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DetallePedidoProps {
    pedidoId: number
}

export function DetallePedido({ pedidoId }: DetallePedidoProps) {
    const { data: pedido, isLoading, error } = usePedidoUsuario(pedidoId)

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-64" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="py-4 border-b">
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-16 w-16 rounded-md" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-4 w-1/4" />
                                    </div>
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error || !pedido) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    No se pudo cargar el detalle del pedido. Por favor, intenta nuevamente más tarde.
                    <Button asChild variant="outline" className="mt-4 ml-2">
                        <Link href="/pedidos">Volver a mis pedidos</Link>
                    </Button>
                </AlertDescription>
            </Alert>
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button asChild variant="ghost" className="mb-6">
                    <Link href="/pedidos">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Volver a mis pedidos
                    </Link>
                </Button>
                <Badge variant={getEstadoBadgeVariant(pedido.estado)}>{pedido.estado}</Badge>
            </div>

            <h1 className="text-3xl font-bold">Pedido #{pedido.id}</h1>
            <p className="text-muted-foreground">Realizado el {format(new Date(pedido.fecha), "PPP", { locale: es })}</p>

            <Card>
                <CardHeader>
                    <CardTitle>Información del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium">Dirección de envío</h3>
                            <p className="text-sm text-muted-foreground">{pedido.direccionEnvio || "No especificada"}</p>
                        </div>
                        <div>
                            <h3 className="font-medium">Método de pago</h3>
                            <p className="text-sm text-muted-foreground">{pedido.metodoPago || "No especificado"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Productos</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-auto max-h-[400px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead className="text-right">Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pedido.detalles.map((detalle) => (
                                    <TableRow key={detalle.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                                    <Image
                                                        src={detalle.producto.imagen || "/placeholder.svg"}
                                                        alt={detalle.producto.nombre}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="font-medium">{detalle.producto.nombre}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{detalle.cantidad}</TableCell>
                                        <TableCell>${Number(detalle.precioUnitario).toFixed(2)}</TableCell>
                                        <TableCell className="text-right">${Number(detalle.subtotal).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>

                    <div className="mt-6 space-y-4">
                        <Separator />
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${Number(pedido.total).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${Number(pedido.total).toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

