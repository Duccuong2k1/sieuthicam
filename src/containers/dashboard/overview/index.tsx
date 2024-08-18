'use client'
import { getStatisticList } from '@/actions/statistic.action'
import { parseNumber } from '@/libs/helpers/parser'
import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import FilterStatistic from './component/FilterStatistic'
import { FILTER_OPTIONS } from '@/libs/constants/statistic'
import DataTableSuccessOrder from './component/DataTableSuccessOrder'
import DataTableDebitOrder from './component/DataTableDebitOrder'
import dayjs from 'dayjs'
import { useToast } from '@/libs/providers/toast-provider'

type Props = {}

export default function OverViewContent({}: Props) {
  const toast = useToast()
  const [result, setResult] = useState<any>(null)
  const [filter, setFilter] = useState<{ filter: string; startDate?: string; endDate?: string }>({
    filter: 'today',
    startDate: '',
    endDate: '',
  })
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getStatisticList({
          filter: filter?.filter || 'today',
          startDate: filter?.startDate || '',
          endDate: filter?.endDate || '',
        })
        setResult(data?.data)
      } catch (error) {
        console.log('error filter statistic', error)
        toast.error('Vui lòng chọn ngày thống kê')
      }
    })()
  }, [filter])

  console.log('filter', filter)
  const onSearch = (value: any) => {
    const searchParams: { [key: string]: string } = {}

    if (Array.isArray(value?.dateRanges) && value.dateRanges.length === 2) {
      const [startDate, endDate] = value.dateRanges
      if (startDate) {
        searchParams.startDate = dayjs(startDate).startOf('day').toISOString() // Convert dayjs to ISO string
      }
      if (endDate) {
        searchParams.endDate = dayjs(endDate).endOf('day').toISOString() // Convert dayjs to ISO string
      }
    }
    setFilter({
      // ...filter,
      filter: value?.filter,
      startDate: searchParams?.startDate,
      endDate: searchParams?.endDate,
    })
  }

  const renderLabel = useMemo(() => {
    return (
      <div className="uppercase font-semibold text-lg my-3">
        Tổng quan trong {FILTER_OPTIONS.find((item) => item.value === filter?.filter)?.label || 'Hôm nay'}
      </div>
    )
  }, [filter?.filter])

  return (
    <div>
      {renderLabel}
      <FilterStatistic onSearch={onSearch} />
      <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-3 grid-cols-2 mt-3 ">
        <Card bordered={false}>
          <Statistic
            title="Tổng tiền"
            value={parseNumber(result?.infoResult?.totalRevenue)}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            //   prefix={<ArrowUpOutlined />}
            suffix="VND"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Tổng số đơn"
            value={parseNumber(result?.infoResult?.totalOrders)}
            valueStyle={{ color: '#1a94c9' }}
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Tổng tiền thành công"
            value={parseNumber(result?.infoResult?.totalPaidAmount)}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            //   prefix={<ArrowDownOutlined />}
            suffix="VND"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Tiền còn ghi nợ"
            value={parseNumber(result?.infoResult?.totalUnpaidAmount)}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            //   prefix={<ArrowDownOutlined />}
            suffix="VND"
          />
        </Card>
      </div>
      <div className="grid lg:grid-cols-2 gap-5 grid-cols-1 mt-5">
        <DataTableSuccessOrder productList={result?.listSuccessOrders} />
        <DataTableDebitOrder productList={result?.listDebitOrders} />
      </div>
    </div>
  )
}
