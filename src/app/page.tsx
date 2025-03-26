import { Header } from "@/components/header"
import { ListaProductos } from "@/components/lista-productos"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Productos Destacados</h1>
        <ListaProductos />
      </main>
    </div>
  )
}

