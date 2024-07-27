'use client'
import React, { useState } from 'react'
import NavSettingTab from './component/SettingThemeSystemTab'
import { Radio, RadioChangeEvent, Space, Tabs } from 'antd'
import { TabsPosition } from 'antd/es/tabs'
import SettingThemeSystemTab from './component/SettingThemeSystemTab'
import { SettingInfoSystemTab } from './component/SettingInfoSystemTab'
import SettingConfiguration from './component/SettingConfiguration'

type Props = {}

export default function SettingSystemPage({}: Props) {
  const [tabPosition, setTabPosition] = useState<TabsPosition>('left')

  const changeTabPosition = (e: RadioChangeEvent) => {
    setTabPosition(e.target.value)
  }

  return (
    <div className="">
      <div className="font-medium mb-4">Cài đặt hệ thống</div>
      {/* <div className='w-1/5'> */}
      {/* <NavSettingTab /> */}
      {/* </div> */}
      {/* <div className='flex-1'>Body</div> */}

      <Tabs
        className="pl-0"
        tabPosition={tabPosition}
        items={TAB_SETTING?.map((tabContent: ITabSetting, i: number) => {
          const id = String(i + 1)
          return {
            label: `${tabContent.label}`,
            key: id,
            children: tabContent.component,
          }
        })}
      />
    </div>
  )
}
export interface ITabSetting {
  label: string
  component: React.ReactNode
}
const TAB_SETTING: ITabSetting[] = [
  {
    label: 'Thiết lập thông tin',
    component: <SettingInfoSystemTab />,
  },

  {
    label: 'Cấu hình website',
    component: <SettingConfiguration />,
  },
  {
    label: 'Tạo theme cấu hình',
    component: <SettingThemeSystemTab />,
  },
]
