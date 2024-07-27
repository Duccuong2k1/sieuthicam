'use client'
import React, { useCallback, useRef, useState } from 'react'
import { Button, Popconfirm, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiPencil } from 'react-icons/bi'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { useToast } from '@/libs/providers/toast-provider'

import { TableHeader } from '@/components/shared/table/TableHeader'
import { formatDate } from '@/libs/helpers/parser'
import DataTableContext, { DataTableContextRef } from '@/components/shared/table/DataTableContext'
import { CreateUpdateBlogForm } from './CreateUpdateBlogForm'
import { deleteBlog, getBlogs } from '@/actions/blog.action'
import { IBlog } from '@/types/blog'

type Props = {}

export function DataTableBlog({}: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false)
  const tableRef = useRef<DataTableContextRef>(null)

  const [dataSelected, setDataSelected] = useState<IBlog | null>(null)
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

  const columns: ColumnsType<IBlog> = [
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
            title="Xoá bài viết "
            description="Bạn chắc chắn muốn xoá bài viết này?"
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
      const res = await deleteBlog(idDelete)
      if (res && res.success) {
        toast.success('Xoá bài viết thành công')
        handleReload()
      }
    }
  }, [])

  return (
    <>
      <TableHeader
        handleRefetch={handleReload}
        label="Bài viết"
        onCreate={() => {
          setDataSelected(null)
          setIsOpenDialogForm(true)
        }}
      />

      <DataTableContext<IBlog>
        ref={tableRef}
        columns={columns}
        fetchDataResponse={getBlogs}
        rowSelection={rowSelection}
        textPlaceholder="Tìm kiếm theo tiêu đề"
      />
      <CreateUpdateBlogForm
        open={isOpenDialogForm}
        onCancel={() => setIsOpenDialogForm(false)}
        updateValue={dataSelected}
        onRefetchingTable={handleReload}
      />
    </>
  )
}
