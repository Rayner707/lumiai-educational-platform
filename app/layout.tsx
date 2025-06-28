import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AccessibilityProvider } from "@/components/context/accessibility-context"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "LumiAI - Plataforma Educativa Inteligente",
  description:
    "Aprende de forma personalizada con inteligencia artificial y accesibilidad avanzada.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AccessibilityProvider>
            {children}
            <Toaster />
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}