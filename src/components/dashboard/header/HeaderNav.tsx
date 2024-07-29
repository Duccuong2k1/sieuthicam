'use client'
import { useAuth } from '@/libs/providers/auth-provider'
import { Button, Dropdown, MenuProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { FaBell } from 'react-icons/fa6'
import { MdAddShoppingCart } from 'react-icons/md'

type Props = {}

export function HeaderNav({}: Props) {
  const router = useRouter()
  const { logout, admin } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="text-sm" onClick={logout}>
          Đăng xuất
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-row items-center justify-between px-5 py-3 bg-white z-10 shadow border-b sticky top-0 left-0 right-0">
      <Link href={'/'} className="flex flex-row items-center justify-start font-semibold text-lg">
        <span className="text-primary">Sieu thi cam</span> / Admin
      </Link>
      <div className="flex flex-row items-center gap-5">
        <Link href="/dashboard/orders">
          <Button className="bg-blue-500" type="primary" icon={<MdAddShoppingCart />}>
            Tạo đơn hàng
          </Button>
        </Link>
        <Button className="border-none text-lg">
          <FaBell />
        </Button>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button style={{ border: 'none' }} className="text-sm items-center flex flex-row" icon={<BiUserCircle />}>
            {admin?.firstName}
          </Button>
        </Dropdown>
      </div>
    </div>
  )
}
