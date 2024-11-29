import './globals.css'
import { VERSION } from '@/app/utils/settings'

export const metadata = {
  title: 'Sistema de Autenticación',
  description: 'Sistema de login y registro con Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-100">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}