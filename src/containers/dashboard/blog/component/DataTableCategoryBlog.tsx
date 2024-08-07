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
import { CreateUpdateBlogForm } from './CreateUpdateBlogForm'
import { deleteCoupon, getCoupons } from '@/actions/coupon.action'
import { deleteCategoryBlog, getCategoryBlogs } from '@/actions/category-blog.action'
import { ICategoryBlog } from '@/types/blog'
import { CreateUpdateCategoryBlogForm } from './CreateUpdateCategoryBlogForm'

type Props = {}

export function DataTableCategoryBlog({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)
  const tableRef = useRef<DataTableContextRef>(null)

  const [dataSelected, setDataSelected] = useState<ICategoryBlog | null>(null)
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

  const columns: ColumnsType<ICategoryBlog> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
            title="Xoá danh muc "
            description="Bạn chắc chắn muốn xoá danh muc này?"
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
      const res = await deleteCategoryBlog(idDelete)
      if (res && res.success) {
        toast.success('Xoá danh muc thành công')
        handleReload()
      }
    }
  }, [])

  return (
    <>
      <TableHeader
        handleRefetch={handleReload}
        label="danh mục bài viết"
        onCreate={() => {
          setDataSelected(null)
          setIsOpenDialogForm(true)
        }}
      />

      <DataTableContext<ICategoryBlog>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getCategoryBlogs}
        rowSelection={rowSelection}
        textPlaceholder="Tìm kiếm theo tiêu đề"
      />
      <CreateUpdateCategoryBlogForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />
    </>
  )
}
