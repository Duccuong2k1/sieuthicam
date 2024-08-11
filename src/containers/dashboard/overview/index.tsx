'use client'
import { getStatisticList } from '@/actions/statistic.action'
import { parseNumber } from '@/libs/helpers/parser'
import { Card, Col, Row, Statistic } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import FilterStatistic from './component/FilterStatistic'
import { FILTER_OPTIONS } from '@/libs/constants/statistic'
import DataTableSuccessOrder from './component/DataTableSuccessOrder'
import DataTableDebitOrder from './component/DataTableDebitOrder'

type Props = {}

export default function OverViewContent({}: Props) {
  const [result, setResult] = useState<any>(null)
  const [filter, setFilter] = useState<{ filter: string; startDate?: string; endDate?: string }>({
    filter: 'today',
    startDate: '',
    endDate: '',
  })
  useEffect(() => {
    ;(async () => {
      const data = await getStatisticList({ filter: filter?.filter || 'today' })
      console.log('data nhan ve', data)
      setResult(data?.data)
    })()
  }, [filter])

  console.log('filter', filter)
  const onSearch = (value: any) => {
    console.log('filter nha', value)
    setFilter({
      ...filter,
      filter: value?.filter,
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
            value={parseNumber(result?.infoResult?.totalSuccessfulCostAndBanking)}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            //   prefix={<ArrowDownOutlined />}
            suffix="VND"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Tiền còn ghi nợ"
            value={parseNumber(result?.infoResult?.totalDebitAmount)}
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
