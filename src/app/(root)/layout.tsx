import { ContactPhoneNumber } from '@/components/ContactPhoneNumber'
import { FloatingMenu } from '@/components/FloatingMenu'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-accent">{children}</div>
      <ContactPhoneNumber />
      <div className="lg:hidden block">
        <FloatingMenu />
      </div>
      <Footer />
    </>
  )
}
