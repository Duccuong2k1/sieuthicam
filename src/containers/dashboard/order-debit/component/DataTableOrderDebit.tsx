'use client'
import React, { useCallback, useRef, useState } from 'react'
import { Button, Popconfirm, Space, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { useToast } from '@/libs/providers/toast-provider'

import { TableHeader } from '@/components/shared/table/TableHeader'
import { formatDate, parseNumber } from '@/libs/helpers/parser'
import DataTableContext, { DataTableContextRef } from '@/components/shared/table/DataTableContext'
import { PaymentOrderDebitDialog } from './PaymentOrderDebitDialog'
import { deleteOrderInventory, getInventories } from '@/actions/inventory.action'

import { MdOutlineRemoveRedEye, MdPayments } from 'react-icons/md'
import { getDebitOrdersAdmin } from '@/actions/debit-order.action'
import { IOrderDebit } from '@/types/order-debit'
import LabelPaid from '@/components/shared/common/LabelPaid'
import { ShowDetailOrderImportDialog } from './ShowDetailOrderImportDialog'

type Props = {}

export function DataTableOrderDebit({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)
  const tableRef = useRef<DataTableContextRef>(null)
  const [isOpenDetailDialog, setIsOpenDetailDialog] = useState<IOrderDebit | null>(null)
  const [orderDetailPayment, setOrderDetailPayment] = useState<IOrderDebit | null>(null)

  const [dataSelected, setDataSelected] = useState<IOrderDebit | null>(null)
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

  const columns: ColumnsType<IOrderDebit> = [
    {
      title: 'Người mua - SĐT',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (_, { orderId }) => {
        return (
          <div className="flex flex-col gap-y-1">
            <div className="font-semibold">
              {orderId?.buyerName} - {orderId?.buyerPhone}
            </div>
            <div className="text-gray-500 text-xs">({orderId?.code})</div>
          </div>
        )
      },
    },
    {
      title: 'Ngày mua ',
      dataIndex: 'dateBuy',
      key: 'dateBuy',
      render: (_, { orderId }) => {
        return <div>{formatDate(orderId?.createdAt, 'dd/MM/yyyy - HH:mm')}</div>
      },
    },
    {
      title: 'Tổng tiền nợ',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (_, { orderId }) => {
        return <div className="text-blue-500">{parseNumber(orderId?.totalCost, 'VND')}</div>
      },
    },
    {
      title: 'Tiền còn nợ',
      dataIndex: 'totalAmountOutStanding',
      key: 'totalAmountOutStanding',
      sorter: (a, b) => a.totalAmountOutStanding - b.totalAmountOutStanding,
      render: (_, { totalAmountOutStanding }) => {
        return <div className="text-red-500">{parseNumber(totalAmountOutStanding, 'VND')}</div>
      },
    },
    {
      title: 'Tiền đã trả',
      dataIndex: 'totalAmountPaid',
      key: 'totalAmountPaid',
      sorter: (a, b) => a.totalAmountPaid - b.totalAmountPaid,
      render: (_, { totalAmountPaid }) => {
        return <div className="text-green-500">{parseNumber(totalAmountPaid, 'VND')}</div>
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        return <LabelPaid value={status} />
      },
    },

    {
      title: 'Ngày cập nhật ',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, { updatedAt }) => {
        return <div>{formatDate(updatedAt, 'dd/MM/yyyy - HH:mm')}</div>
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Thanh toán nợ" placement="rightTop" color={'info'} key={'info'}>
            <Button
              onClick={() => {
                setIsOpenDialogForm(true)
                setOrderDetailPayment(record)
              }}
              icon={<MdPayments />}
            ></Button>
          </Tooltip>
          {/* <Tooltip title="Xem đơn mua" placement="rightTop" color={'info'} key={'info'}>
            <Button
              onClick={() => {
                setIsOpenDetailDialog(record)
              }}
              icon={<MdOutlineRemoveRedEye />}
            ></Button>
          </Tooltip> */}
          {/* <Popconfirm
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
          </Popconfirm> */}
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
        label="ghi nợ"
        onCreate={() => {
          // setDataSelected(null)
          // setIsOpenDialogForm(true)
        }}
        isVisibleCreate={false}
      />

      <DataTableContext<IOrderDebit>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getDebitOrdersAdmin}
        rowSelection={rowSelection}
        textPlaceholder="Tìm kiếm theo (Người mua, Sđt...)"
        isShowFilterDate
      />
      <PaymentOrderDebitDialog
        open={isOpenDialogForm}
        onCancel={() => {
          setOrderDetailPayment(null)
          setIsOpenDialogForm(false)
        }}
        onRefetchingTable={handleReload}
        infoDetailOrder={orderDetailPayment}
      />

      {/* <ShowDetailOrderImportDialog
        open={!!isOpenDetailDialog}
        onCancel={() => setIsOpenDetailDialog(null)}
        detailItem={isOpenDetailDialog}
      /> */}
    </>
  )
}
