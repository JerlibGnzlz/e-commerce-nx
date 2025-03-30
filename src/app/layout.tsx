import type React from "react"
import { QueryProvider } from "@/providers/query-provider"
import { ToastProvider } from "@/providers/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"
// import { AuthProvider } from "@/providers/session-provider"
// import './globals.css';
import { AuthProvider } from "@/providers/session-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <QueryProvider>
              {children}
              <ToastProvider />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

