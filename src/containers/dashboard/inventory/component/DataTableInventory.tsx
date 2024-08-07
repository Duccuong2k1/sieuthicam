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
import { CreateUpdateInventoryForm } from './CreateUpdateInventoryForm'
import { deleteOrderInventory, getInventories } from '@/actions/inventory.action'
import { IInventory } from '@/types/inventory'
import { ShowDetailOrderImportDialog } from './ShowDetailOrderImportDialog'
import { MdOutlineRemoveRedEye } from 'react-icons/md'

type Props = {}

export function DataTableInventory({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)
  const tableRef = useRef<DataTableContextRef>(null)
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState<IInventory | null>(null)

  const [dataSelected, setDataSelected] = useState<IInventory | null>(null)
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

  const columns: ColumnsType<IInventory> = [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Người nhập hàng',
      dataIndex: 'importInventoryBy',
      key: 'importInventoryBy',
    },
    {
      title: 'Tổng tiền nhập',
      dataIndex: 'totalCost',
      key: 'totalCost',
      sorter: (a, b) => a.totalCost - b.totalCost,
      render: (_, { totalCost }) => {
        return <div className="text-blue-500">{parseNumber(totalCost, 'VND')}</div>
      },
    },

    {
      title: 'Ngày nhập ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => {
        return <div>{formatDate(createdAt, 'dd/MM/yyyy - HH:mm')}</div>
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => {
              setIsOpenDetailDialog(record)
            }}
            icon={<MdOutlineRemoveRedEye />}
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
      const res = await deleteOrderInventory(idDelete)
      if (res && res.success) {
        toast.success('Xoá đơn thành công')
        handleReload()
      }
    }
  }, [])
  return (
    <>
      <TableHeader
        handleRefetch={handleReload}
        label="đơn nhập hàng"
        onCreate={() => {
          setDataSelected(null)
          setIsOpenDialogForm(true)
        }}
      />

      <DataTableContext<IInventory>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getInventories}
        rowSelection={rowSelection}
        textPlaceholder="Tìm kiếm theo tiêu đề"
      />
      <CreateUpdateInventoryForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        onRefetchingTable={handleReload}
      />

      <ShowDetailOrderImportDialog
        open={!!isOpenDetailDialog}
        onCancel={() => setIsOpenDetailDialog(null)}
        detailItem={isOpenDetailDialog}
      />
    </>
  )
}
