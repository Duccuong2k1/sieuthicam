'use client'
import LabelPaid from '@/components/shared/common/LabelPaid'
import { parseNumber } from '@/libs/helpers/parser'
import { IOrder, IOrderProduct, PAYMENT_METHOD_ORDER } from '@/types/order'
import { Table, TableColumnsType, Tag } from 'antd'
import React, { useId, useState } from 'react'

type Props = {
  productList: IOrder[]
}

export default function DataTableSuccessOrder({ productList }: Props) {
  const id = useId()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleTableChange = (pagination: any) => {
    console.log('pagination', pagination)
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  const columns: TableColumnsType<IOrder> = [
    {
      title: 'Mã đơn ',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên - SĐT',
      dataIndex: 'buyerName',
      key: 'buyerName',
      render: (_, { buyerName, buyerPhone, paymentMethod }) => (
        <>
          <div className="">
            {buyerName} - {buyerPhone}
          </div>
          <Tag className="" color="cyan">
            {PAYMENT_METHOD_ORDER?.find((item) => item.value === paymentMethod)?.label}
          </Tag>
        </>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (totalCost) => (
        <>
          <div className="text-green-500 font-semibold">{parseNumber(totalCost, 'VND')}</div>
        </>
      ),
    },
    {
      title: 'Phương thức',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (_, { buyerStatusPaid }) => (
        <>
          <LabelPaid value={buyerStatusPaid} />
        </>
      ),
    },
  ]
  return (
    <div>
      <div className="font-semibold uppercase my-3">
        Danh sách đơn thành công <span className="font-semibold text-blue-500">({productList?.length})</span>{' '}
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record._id || id}
        dataSource={productList}
        pagination={{
          total: productList?.length || 0,
          pageSize: pageSize,
          current: currentPage,
          onChange: handleTableChange,
        }}
        className="border"
      />
    </div>
  )
}
