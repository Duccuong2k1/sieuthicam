import { useGetThemes } from '@/libs/hooks/useGetTheme'
import { cn } from '@/libs/utils'
import { Button, Image } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {}

export default function SettingConfiguration({}: Props) {
  const { themes } = useGetThemes()
  console.log('themes nhan ve', themes)
  const [headerSelected, setHeaderSelected] = useState('')
  const handleSelectedHeader = useCallback((theme: string) => {
    setHeaderSelected(theme)
  }, [])

  useEffect(() => {
    if (themes) setHeaderSelected(themes?.headerSelected)
  }, [themes])
  console.log('header', headerSelected, themes?.headerSelected)
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <span className="font-medium uppercase my-3 text-xl ">Chọn header hiển thị</span>
        <Button className="bg-blue-500" type="primary">
          Save
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {themes &&
          themes?.header?.map((item, idx) => (
            <div
              className={cn(
                'border rounded-md flex flex-col items-center gap-3 ',
                headerSelected === item?.title ? 'border-2 border-primary' : '',
              )}
              key={idx}
              onClick={() => handleSelectedHeader(item?.title)}
            >
              <Image src={item?.image} alt={' image theme header'} width={'auto'} height={300} className="" />
              <div>{item?.title}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
