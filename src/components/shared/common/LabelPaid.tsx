'use client'
import { PAYMENT_STATUS_ORDER } from '@/types/order-debit'
import { Tag } from 'antd'
import React, { useMemo } from 'react'

type Props = {
  value: string
}

export default function LabelPaid({ value }: Props) {
  const renderLabel = useMemo(() => {
    return PAYMENT_STATUS_ORDER.find((item) => item.value === value)?.label
  }, [value])
  return <Tag color={value === 'unpaid' ? 'red' : 'green'}>{renderLabel}</Tag>
}
