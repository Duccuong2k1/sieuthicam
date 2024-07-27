'use client'
import { HeaderNav } from '@/components/dashboard/header/HeaderNav'
import { SidebarNav } from '@/components/dashboard/sidebar/SidebarNav'
import { isCheckUser } from '@/components/shared/common/isCheckUser'
import { GLOBAL } from '@/libs/constants/global'
import { AuthProvider } from '@/libs/providers/auth-provider'
import ThemeProvider from '@/libs/providers/theme-ant-provider'
import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    if (!isCheckUser(GLOBAL.ADMIN)) {
      router.push('/login')
    }
  }, [isCheckUser, router])
  return (
    <ThemeProvider>
      <HeaderNav />
      <section className="flex flex-row gap-3 justify-start min-h-screen w-full">
        <SidebarNav />

        <div className="p-3 flex-1">{children}</div>
      </section>
    </ThemeProvider>
  )
}
