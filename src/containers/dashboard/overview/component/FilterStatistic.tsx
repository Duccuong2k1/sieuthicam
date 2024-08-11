import { FILTER_OPTIONS } from '@/libs/constants/statistic'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import React from 'react'

type Props = {
  onSearch: (value: any) => void
}

export default function FilterStatistic({ onSearch }: Props) {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const handleSearch = (values: any) => {
    const { dateRange, filter } = values
    const searchParams: { keyword?: string; dateRanges?: [string, string]; filter?: string } = {}

    if (filter) {
      searchParams.filter = filter
    }
    if (dateRange && dateRange.length === 2) {
      searchParams.dateRanges = [dateRange[0].toISOString(), dateRange[1].toISOString()]
      //   searchParams.dateRanges = [dateRange[0].startOf('day'), dateRange[1].endOf('day')]
    }

    onSearch(searchParams)
  }
  return (
    <div>
      <Form form={form} layout="inline" onFinish={handleSearch}>
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

        {/* <Form.Item name="dateRange">
          <RangePicker format="DD-MM-YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} />
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lọc
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
