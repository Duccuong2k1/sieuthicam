import './globals.css'

import { Inter } from 'next/font/google'
import Head from './head'
import { ToastProvider } from '@/libs/providers/toast-provider'
import { AuthProvider } from '@/libs/providers/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
