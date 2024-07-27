'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

import { ConfigProvider } from 'antd'
import theme from '@/components/shared/theme/themeConfig'
import { AntdProvider } from './ant-provider'

export type ProviderProps = PropsWithChildren<{}>

export function AntdConfigProvider({ children }: ProviderProps) {
  return (
    <ConfigProvider theme={theme}>
      <AntdProvider>{children}</AntdProvider>
    </ConfigProvider>
  )
}

export default function ThemeProvider(props: ProviderProps) {
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // use your loading page
    return <div className="hidden">{props.children}</div>
  }

  return (
    <>
      <AntdConfigProvider {...props} />
    </>
  )
}
