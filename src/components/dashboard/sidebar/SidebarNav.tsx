'use client'
import React from 'react'
import {
  AppstoreOutlined,
  UserAddOutlined,
  CreditCardOutlined,
  AreaChartOutlined,
  OrderedListOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import Link from 'next/link'
import { BsJournalText } from 'react-icons/bs'
import { MdContentPaste, MdOutlineContactMail, MdOutlineDiscount } from 'react-icons/md'
import { usePathname } from 'next/navigation'
type MenuItem = Required<MenuProps>['items'][number]
type Props = {}

export function SidebarNav({}: Props) {
  const pathName = usePathname()
  const navActive = pathName.split('/')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  return (
    <div className="w-[256px]">
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        className="h-full fixed left-0 top-14 overflow-y-auto w-auto"
        defaultSelectedKeys={[`${navActive?.[2]}`]}
        defaultOpenKeys={['1']}
        mode="inline"
        items={MenuNav}
      />
      <div className="z-20 bg-white p-3 text-black fixed bottom-0 left-0 border  w-[255px] text-center text-xs">
        @ {new Date().getFullYear()} CMS Sieu-thi-cam
      </div>
    </div>
  )
}

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const pathAdmin = '/dashboard'
const MenuNav: MenuItem[] = [
  getItem('Quản trị', '1', <UserAddOutlined />, [
    getItem(<Link href={`${pathAdmin}/info`}>Thông tin tài khoản</Link>, 'info'),
    getItem(<Link href={`${pathAdmin}/user`}>Quản lý tài khoản</Link>, 'user'),
    getItem(<Link href={`${pathAdmin}/setting`}>Cài đặt hệ thống</Link>, 'setting'),
  ]),

  getItem(<Link href={`${pathAdmin}/categories`}>Quản lý danh mục</Link>, '2', <OrderedListOutlined />),
  getItem(<Link href={`${pathAdmin}/products`}>Quản lý sản phẩm</Link>, '3', <AppstoreOutlined />),
  getItem(<Link href={`${pathAdmin}/orders`}>Quản lý đơn </Link>, '4', <BsJournalText />),
  getItem(<Link href={`${pathAdmin}/inventory`}>Quản lý tồn kho</Link>, 'inventory', <BsJournalText />),

  getItem(<Link href={`${pathAdmin}/import-history`}>Quản lý lịch sử nhập hàng</Link>, '10', <BsJournalText />),

  getItem(<Link href={`${pathAdmin}/contacts`}>Liên hệ hỗ trợ</Link>, '6', <MdOutlineContactMail />),
  getItem(<Link href={`${pathAdmin}/coupons`}>Danh sách khuyến mãi</Link>, '7', <MdOutlineDiscount />),
  getItem(<Link href={`${pathAdmin}/blogs`}>Quản lý danh mục & bài viết</Link>, '8', <MdContentPaste />),

  getItem('Thống kê', '9', <AreaChartOutlined />, [getItem('Option 7', '8.1')]),
]
