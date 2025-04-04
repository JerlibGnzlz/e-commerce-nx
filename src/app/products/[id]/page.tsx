import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"

interface ProductPageProps {
    params: {
        id: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">
                <ProductDetail productId={params.id} />
            </main>
        </div>
    )
}

