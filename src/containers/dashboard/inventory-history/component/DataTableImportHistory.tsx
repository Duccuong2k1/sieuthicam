'use client'
import React, { useCallback, useRef, useState } from 'react'
import { Button, Popconfirm, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiPencil } from 'react-icons/bi'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { useToast } from '@/libs/providers/toast-provider'

import { TableHeader } from '@/components/shared/table/TableHeader'
import { formatDate, parseNumber } from '@/libs/helpers/parser'
import DataTableContext, { DataTableContextRef } from '@/components/shared/table/DataTableContext'

import { deleteOrderInventoryHistory, getImportHistoryInventories } from '@/actions/import-history.action'
import { IImportHistoryInventory } from '@/types/import-history'

type Props = {}

export function DataTableImportHistory({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)
  const tableRef = useRef<DataTableContextRef>(null)

  const [dataSelected, setDataSelected] = useState<IImportHistoryInventory | null>(null)
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

  const columns: ColumnsType<IImportHistoryInventory> = [
    {
      title: 'Mã đơn nhập',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Người nhập hàng',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => {
        return <div>{formatDate(createdAt, 'dd/MM/yyyy - HH:mm')}</div>
      },
    },
    {
      title: 'Tổng mặt hàng',
      dataIndex: 'totalProduct',
      key: 'totalProduct',
      render: (_, { products }) => {
        return <div className="">{parseNumber(products?.length || 0)}</div>
      },
    },
    {
      title: 'Tổng tiền nhập',
      dataIndex: 'total',
      key: 'total',
      render: (_, { products }) => {
        return (
          <div className="text-blue-500">
            {parseNumber(
              products.reduce((acc: number, item: any) => {
                return acc + item.quantity * item.importPrice
              }, 0),
              'VND',
            )}
          </div>
        )
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
            title="Xoá đơn này "
            description="Bạn chắc chắn muốn xoá đơn này?"
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
      const res = await deleteOrderInventoryHistory(idDelete)
      if (res && res.success) {
        toast.success('Xoá đơn thành công')
        handleReload()
      }
    }
  }, [])
  return (
    <>
      <TableHeader handleRefetch={handleReload} label="lịch sử nhập hàng" onCreate={() => {}} isVisibleCreate={false} />

      <DataTableContext<IImportHistoryInventory>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getImportHistoryInventories}
        rowSelection={rowSelection}
        textPlaceholder="Tìm kiếm theo tiêu đề"
      />
    </>
  )
}
