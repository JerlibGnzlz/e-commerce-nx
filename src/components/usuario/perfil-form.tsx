"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useActualizarPerfil, usePerfil } from "@/services/usuario-service"
import { Skeleton } from "@/components/ui/skeleton"
import type { ClienteFormData } from "@/types/auth"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const perfilFormSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    apellido: z.string().optional(),
    telefono: z.string().optional(),
    direccion: z.string().optional(),
    ciudad: z.string().optional(),
    codigoPostal: z.string().optional(),
    pais: z.string().optional(),
})

export function PerfilForm() {
    const { data: session } = useSession()
    const { data: perfil, isLoading } = usePerfil()
    const { mutate: actualizarPerfil, isPending } = useActualizarPerfil()

    const form = useForm<z.infer<typeof perfilFormSchema>>({
        resolver: zodResolver(perfilFormSchema),
        defaultValues: {
            nombre: "",
            apellido: "",
            telefono: "",
            direccion: "",
            ciudad: "",
            codigoPostal: "",
            pais: "",
        },
    })

    // Actualizar valores del formulario cuando se carga el perfil
    useEffect(() => {
        if (perfil) {
            form.reset({
                nombre: perfil.nombre || "",
                apellido: perfil.apellido || "",
                telefono: perfil.telefono || "",
                direccion: perfil.direccion || "",
                ciudad: perfil.ciudad || "",
                codigoPostal: perfil.codigoPostal || "",
                pais: perfil.pais || "",
            })
        } else if (session?.user) {
            form.reset({
                nombre: session.user.name || "",
            })
        }
    }, [perfil, session, form])

    function onSubmit(values: z.infer<typeof perfilFormSchema>) {
        actualizarPerfil(values as ClienteFormData)
    }

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Actualiza tu información personal y preferencias de contacto.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="nombre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu nombre" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="apellido"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu apellido" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="telefono"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu número de teléfono" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="direccion"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Dirección</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu dirección" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ciudad"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ciudad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu ciudad" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="codigoPostal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Código Postal</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu código postal" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pais"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>País</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tu país" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Guardando..." : "Guardar cambios"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

