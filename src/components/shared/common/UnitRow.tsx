import { UNIT_OPTIONS } from '@/libs/constants/product'
import React from 'react'

type Props = {
  unit: any
}

export default function UnitRow({ unit }: Props) {
  const renderUnit = (value: any) => {
    return <span>{UNIT_OPTIONS?.find((item) => item.value === value)?.label}</span>
  }
  return <>{renderUnit(unit)}</>
}
