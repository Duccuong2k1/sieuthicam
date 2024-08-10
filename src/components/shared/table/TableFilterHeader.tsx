import React from 'react'
import { SearchHeader } from './SearchHeader'
import { Select } from 'antd'
import { PAYMENT_METHOD_ORDER } from '@/types/order'

type Props = {
  onSearch: (value: string) => void
  placeholder?: string
}

export function TableFilterHeader({ onSearch, placeholder }: Props) {
  const handleSearch = (value: string) => {
    onSearch(value)
  }

  return (
    <div className="my-2 flex flex-row items-center justify-start gap-x-3">
      <SearchHeader onSearch={handleSearch} placeholder={placeholder} />
      {/* <Select options={PAYMENT_METHOD_ORDER} className="w-[200px]" allowClear placeholder="Lọc theo..." /> */}
    </div>
  )
}
