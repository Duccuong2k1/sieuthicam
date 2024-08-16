'use client'
import { parseNumber } from '@/libs/helpers/parser'
import { IOrder, PAYMENT_METHOD_ORDER } from '@/types/order'
import { Button, Space, Table, TableColumnsType, Tag, Tooltip } from 'antd'
import React, { useId, useState } from 'react'
import { ShowDetailOrderDialog } from '../../orders/component/ShowDetailOrderDialog'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import LabelPaid from '@/components/shared/common/LabelPaid'

type Props = {
  productList: IOrder[]
}

export default function DataTableDebitOrder({ productList }: Props) {
  const id = useId()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current || 1)
    setPageSize(pagination.pageSize || 10)
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
          <Tag color="red" className="">
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
          <div className="text-red-500 font-semibold">{parseNumber(totalCost, 'VND')}</div>
        </>
      ),
    },
    {
      title: 'Phương thức',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (_, { paymentMethod, buyerStatusPaid }) => (
        <>{paymentMethod === 'debit' && <LabelPaid value={buyerStatusPaid} />}</>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="small">
    //       <Tooltip title="Xem chi tiết đơn" placement="rightTop" color={'info'} key={'info'}>
    //         <Button
    //           onClick={() => {
    //             setDataSelected(record)
    //           }}
    //           icon={<MdOutlineRemoveRedEye />}
    //         ></Button>
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ]
  return (
    <div>
      <div className="font-semibold uppercase my-3">
        Danh sách đơn ghi nợ <span className="font-semibold text-blue-500">({productList?.length})</span>
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
