"use client"

import Link from "next/link"
import { ContadorCarrito } from "@/components/carrito/contador-carrito"
import { UserNav } from "@/components/auth/user-nav"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl">EcoNext Shop</span>
                </Link>

                <nav className="flex items-center space-x-4">
                    <Link href="/" className="text-sm font-medium">
                        Productos
                    </Link>
                    <Link href="/pedidos" className="text-sm font-medium">
                        Mis Pedidos
                    </Link>
                    <ContadorCarrito />
                    <UserNav />
                </nav>
            </div>
        </header>
    )
}

