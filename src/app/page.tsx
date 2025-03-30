// import { Header } from "@/components/header"
// import { ListaProductos } from "@/components/lista-productos"

// export default function HomePage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1 container py-8">
//         <h1 className="text-3xl font-bold mb-6">Productos Destacados</h1>
//         <ListaProductos />
//       </main>
//     </div>
//   )
// }

// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
          <CardDescription>Suscríbete a nuestro boletín sobre diseño, codificación y AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input type="email" placeholder="email@ejemplo.com" />
            <Button type="submit">Suscribirse</Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Recibirás actualizaciones sobre diseño, código y más.
        </CardFooter>
      </Card>
    </main>
  )
}