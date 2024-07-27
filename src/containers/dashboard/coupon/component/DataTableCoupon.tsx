'use client'
import React, { ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react'
import { Button, Popconfirm, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiPencil } from 'react-icons/bi'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { useToast } from '@/libs/providers/toast-provider'

import { TableHeader } from '@/components/shared/table/TableHeader'
import { formatDate } from '@/libs/helpers/parser'
import DataTableContext, { DataTableContextRef } from '@/components/shared/table/DataTableContext'
import { ICoupon } from '@/types/coupon'
import { CreateUpdateCouponForm } from './CreateUpdateCouponForm'
import { deleteCoupon, getCoupons } from '@/actions/coupon.action'

type Props = {}

export function DataTableCoupon({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)
  const tableRef = useRef<DataTableContextRef>(null)

  const [dataSelected, setDataSelected] = useState<ICoupon | null>(null)
  const toast = useToast()

  const handleReload = () => {
    tableRef.current?.reloadTable()
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  const hasSelected = selectedRowKeys.length > 0

  const columns: ColumnsType<ICoupon> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mã Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Giá giảm',
      dataIndex: 'discount',
      key: 'discount',
      render: (_, { discount }) => {
        return <div>{discount} %</div>
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => {
        return <div>{formatDate(createdAt, 'dd/MM/yyyy')}</div>
      },
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expiry',
      key: 'expiry',
      render: (_, { expiry }) => {
        return <div>{formatDate(expiry, 'dd/MM/yyyy')}</div>
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => {
              setIsOpenDialogForm(true)
              setDataSelected(record)
            }}
            icon={<BiPencil />}
          ></Button>
          <Popconfirm
            title="Xoá khuyến mãi "
            description="Bạn chắc chắn muốn xoá khuyến mãi này?"
            icon={<QuestionCircleOutlined />}
            onConfirm={() => {
              if (record._id) {
                handleDeleteItem({ idDelete: record._id })
              }
            }}
            // color="volcano"
            okButtonProps={{ danger: true }}
            okText="Xác nhận"
          >
            <Button danger icon={<RiDeleteBin6Line />} className="" />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleDeleteItem = useCallback(async ({ idDelete }: { idDelete: string }) => {
    if (idDelete) {
      const res = await deleteCoupon(idDelete)
      if (res && res.success) {
        toast.success('Xoá khuyến mãi thành công')
        handleReload()
      }
    }
  }, [])

  return (
    <>
      <TableHeader
        handleRefetch={handleReload}
        label="khuyến mãi"
        onCreate={() => {
          setDataSelected(null)
          setIsOpenDialogForm(true)
        }}
      />

      <DataTableContext<ICoupon>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getCoupons}
        rowSelection={rowSelection}
      />
      <CreateUpdateCouponForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />
    </>
  )
}
