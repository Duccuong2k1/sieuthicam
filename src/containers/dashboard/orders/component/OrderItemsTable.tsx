import UnitRow from '@/components/shared/common/UnitRow'
import { UNIT_OPTIONS } from '@/libs/constants/product'
import { parseNumber } from '@/libs/helpers/parser'
import { useOrder } from '@/libs/providers/order-provider'
import { IProductAddOrder } from '@/types/order'
import { Button, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useCallback, useEffect, useMemo } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'

type Props = {}

export default function OrderItemsTable({}: Props) {
  const { productAddOrderList, setProductAddOrderList } = useOrder()

  const handleDelete = (key: React.Key) => {
    const newData = productAddOrderList.filter((item) => item.productId !== key)
    setProductAddOrderList(newData)
  }

  const totalCost = useCallback(() => {
    let total = 0
    total = productAddOrderList.reduce((acc: number, item: any) => {
      let result = item?.quantity ? item.quantity * item.salePrice : item.weight * item.salePrice
      return acc + result
    }, 0)

    return total
  }, [productAddOrderList])
  const defaultColumns: ColumnsType<IProductAddOrder> = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productLabel',
      width: '30%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, { quantity, unit }) => {
        return (
          quantity && (
            <div>
              {parseNumber(quantity)} <UnitRow unit={unit} />
            </div>
          )
        )
      },
    },
    {
      title: 'Trọng lượng',
      dataIndex: 'weight',
      render: (_, { weight, unit }) => {
        return (
          weight && (
            <div>
              {parseNumber(weight)} <UnitRow unit={unit} />
            </div>
          )
        )
      },
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      render: (_, { salePrice }) => {
        return <div>{parseNumber(salePrice, 'VND')}</div>
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        productAddOrderList.length >= 1 ? (
          <Popconfirm
            title="Bạn chắc chắn muốn xoá sản phẩm này?"
            onConfirm={() => handleDelete(record.productId)}
            okButtonProps={{ danger: true }}
            okText="Xác nhận"
          >
            <Button danger icon={<RiDeleteBin6Line />} className="" />
          </Popconfirm>
        ) : null,
    },
  ]

  return (
    <>
      <Table bordered dataSource={productAddOrderList} columns={defaultColumns} />
      <div className="text-right text-lg font-semibold mt-3">
        Tổng tiền: <span className="text-blue-500 ">{parseNumber(totalCost(), 'VND')}</span>
      </div>
    </>
  )
}
