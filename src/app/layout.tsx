import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A blog built with Next.js 14 and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-primary-600">
                My Blog
              </a>
              <div className="space-x-6">
                <a href="/" className="hover:text-primary-600 transition-colors">
                  Home
                </a>
                <a href="/posts" className="hover:text-primary-600 transition-colors">
                  Posts
                </a>
                <a href="/about" className="hover:text-primary-600 transition-colors">
                  About
                </a>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t py-8 mt-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
