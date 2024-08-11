import React from 'react'
import { SearchHeader } from './SearchHeader'
import { Button, DatePicker, Form, Input, Select } from 'antd'

type Props = {
  onSearch: (value: any) => void
  placeholder?: string
  isShowFilterDate?: boolean
  isShowTagOptions?: boolean
  tagOptions?: any[]
}

export function TableFilterHeader({
  onSearch,
  placeholder,
  isShowFilterDate = false,
  isShowTagOptions = false,
  tagOptions = [],
}: Props) {
  const [form] = Form.useForm()
  const { RangePicker } = DatePicker
  const handleSearch = (values: any) => {
    const { keyword, dateRange, typeSelected } = values
    const searchParams: { keyword?: string; dateRanges?: [string, string]; typeSelected?: string } = {}

    if (keyword) {
      searchParams.keyword = keyword
    }
    if (typeSelected) {
      searchParams.typeSelected = typeSelected
    }
    if (dateRange && dateRange.length === 2) {
      searchParams.dateRanges = [dateRange[0].toISOString(), dateRange[1].toISOString()]
      //   searchParams.dateRanges = [dateRange[0].startOf('day'), dateRange[1].endOf('day')]
    }

    onSearch(searchParams)
  }
  return (
    // <div className="my-2 flex flex-row items-center justify-start gap-x-3">
    //   <SearchHeader onSearch={handleSearch} placeholder={placeholder} />
    //   <RangePicker format="YYYY-MM-DD" />
    // </div>
    <div className="my-2 flex flex-row flex-wrap items-center justify-start">
      <Form form={form} layout="inline" onFinish={handleSearch}>
        <Form.Item name="keyword" className="w-[300px]">
          <Input placeholder={placeholder || 'Tìm kiếm theo ...'} allowClear />
        </Form.Item>
        {isShowTagOptions && (
          <Form.Item name="typeSelected" className="w-[180px]">
            <Select
              options={tagOptions}
              className="w-full mr-2"
              showSearch
              optionFilterProp="label"
              allowClear
              placeholder="Lọc theo kiểu..."
            />
          </Form.Item>
        )}
        {isShowFilterDate && (
          <Form.Item name="dateRange">
            <RangePicker format="DD-MM-YYYY" placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
