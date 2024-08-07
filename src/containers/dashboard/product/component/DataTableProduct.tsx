'use client'
import React, { useCallback, useRef, useState } from 'react'
import { Button, Image, Popconfirm, Space, Tag, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiPencil } from 'react-icons/bi'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { useToast } from '@/libs/providers/toast-provider'

import { TableHeader } from '@/components/shared/table/TableHeader'
import { formatDate, parseNumber } from '@/libs/helpers/parser'
import DataTableContext, { DataTableContextRef } from '@/components/shared/table/DataTableContext'

import { MdOutlineRemoveRedEye } from 'react-icons/md'

import { IProduct } from '@/types/product'
import { deleteProduct, getProducts } from '@/actions/product.action'
import { CreateUpdateProductForm } from './CreateUpdateProductForm'
import UnitRow from '@/components/shared/common/UnitRow'

type Props = {}

export function DataTableProduct({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)

  const tableRef = useRef<DataTableContextRef>(null)

  const [dataSelected, setDataSelected] = useState<IProduct | null>(null)
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

  const columns: ColumnsType<IProduct> = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => (
        <Image
          src={thumbnail}
          alt={'image '}
          width={50}
          className="object-cover rounded p-0.5 border cursor-pointer h-[50px]"
          // onClick={() => setShowImage(img)}
          height={50}
        />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      key: 'salePrice',
      sorter: (a, b) => a.salePrice - b.salePrice,
      render: (_, { salePrice }) => {
        return <div>{parseNumber(salePrice, 'VND')}</div>
      },
    },

    {
      title: 'Số lượng tồn',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      render: (_, { quantity }) => {
        return <div>{parseNumber(quantity)}</div>
      },
    },
    {
      title: 'Trọng lượng',
      dataIndex: 'weight',
      key: 'weight',

      render: (_, { weight }) => {
        return <div>{parseNumber(weight)}</div>
      },
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      render: (_, { unit }) => {
        return <UnitRow unit={unit} />
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
      title: 'Ngày cập nhật',
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
          {/* <Tooltip placement="leftTop" color={'info'} key={'info'} title="Xem chi tiết">
            <Button
              onClick={() => {
                setIsOpenDialogForm(true)
                setDataSelected(record)
              }}
              icon={<MdOutlineRemoveRedEye />}
            ></Button>
          </Tooltip> */}
          <Button
            onClick={() => {
              setIsOpenDialogForm(true)
              setDataSelected(record)
            }}
            icon={<BiPencil />}
          ></Button>
          <Popconfirm
            title="Xoá sản phẩm "
            description="Bạn chắc chắn muốn xoá sản phẩm này?"
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
      const res = await deleteProduct(idDelete)
      if (res && res.success) {
        toast.success('Xoá sản phẩm thành công')
        handleReload()
      }
    }
  }, [])

  return (
    <>
      <TableHeader
        handleRefetch={handleReload}
        label="Sản phẩm"
        onCreate={() => {
          setDataSelected(null)
          setIsOpenDialogForm(true)
        }}
      />

      <DataTableContext<IProduct>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getProducts}
        rowSelection={rowSelection}
        textPlaceholder="Tìm kiếm theo, tên, mã sp,.. "
      />

      <CreateUpdateProductForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />
      {/*      
      <ShowDetailTicketDialog
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        detailItem={dataSelected}
      /> */}
    </>
  )
}
