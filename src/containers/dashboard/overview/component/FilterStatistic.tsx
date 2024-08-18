import { FILTER_OPTIONS } from '@/libs/constants/statistic'
import { Button, DatePicker, Form, Input, Radio, RadioChangeEvent, Select } from 'antd'
import React, { useState } from 'react'

type Props = {
  onSearch: (value: any) => void
}

export default function FilterStatistic({ onSearch }: Props) {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const [typeFilter, setTypeFilter] = useState('default')
  const handleSearch = (values: any) => {
    const { dateRange, filter } = values
    const searchParams: { keyword?: string; dateRanges?: [string, string]; filter?: string } = {}

    if (filter) {
      searchParams.filter = filter
    }
    if (typeFilter === 'custom') {
      searchParams.filter = 'custom'
    }
    if (dateRange && dateRange.length === 2 && typeFilter === 'custom') {
      searchParams.dateRanges = [dateRange[0].toISOString(), dateRange[1].toISOString()]
      //   searchParams.dateRanges = [dateRange[0].startOf('day'), dateRange[1].endOf('day')]
    }

    onSearch(searchParams)
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setTypeFilter(e.target.value)
    form.resetFields()
  }

  console.log('typeFilter', typeFilter)
  return (
    <div>
      <Radio.Group onChange={onChange} value={typeFilter} className="my-3">
        <Radio value={'default'}>Mặc định</Radio>
        <Radio value={'custom'}>Tuỳ chỉnh</Radio>
      </Radio.Group>
      <Form form={form} layout="inline" onFinish={handleSearch}>
        {typeFilter === 'custom' ? (
          <Form.Item name="dateRange">
            <RangePicker format="DD-MM-YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} />
          </Form.Item>
        ) : (
          <Form.Item name="filter" className="w-[180px]">
            <Select
              options={FILTER_OPTIONS}
              className="w-full mr-2"
              showSearch
              optionFilterProp="label"
              allowClear
              placeholder="Lọc theo kiểu..."
              defaultValue={'today'}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lọc
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
