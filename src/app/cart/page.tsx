import { Header } from "@/components/header"
import { CartContent } from "@/components/cart/cart-content"

export default function CartPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">
                <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
                <CartContent />
            </main>
        </div>
    )
}

