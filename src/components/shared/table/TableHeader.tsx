import ButtonRefetch from '@/components/dashboard/button-refetch'
import { Button } from 'antd'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

interface TableHeaderProps {
  label: string
  handleRefetch: () => void
  isLoading?: boolean
  onCreate: () => void
  isVisibleCreate?: boolean
}

export function TableHeader({ label, handleRefetch, isLoading, onCreate, isVisibleCreate = true }: TableHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between mb-2">
      <div className="my-2 text-lg font-semibold">Danh sách {label}</div>
      <div className="flex justify-start gap-3 flex-row">
        <ButtonRefetch handleClick={handleRefetch} isLoading={isLoading} />
        {isVisibleCreate && (
          <Button icon={<AiOutlinePlus />} className="flex flex-row items-center" onClick={onCreate}>
            Tạo {label}
          </Button>
        )}
      </div>
    </div>
  )
}
