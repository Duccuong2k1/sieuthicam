'use client'

import { Select, Table } from 'antd'
import React, { useImperativeHandle, forwardRef, useCallback, useState, useId, useMemo } from 'react'
import { TableFilterHeader } from './TableFilterHeader'
import { usePagination } from '@/libs/hooks/usePagination'
import { PAYMENT_METHOD_ORDER } from '@/types/order'

interface AnyObject {
  [key: string]: any
}

interface DataTableContextProps<T extends AnyObject> {
  columns: any
  fetchDataResponse: (params: any) => Promise<{ data: T[]; total: number }>
  rowSelection?: any
  isFilter?: boolean
  textPlaceholder?: string
}

export interface DataTableContextRef {
  reloadTable: () => void
  isLoading: boolean
}

const DataTableContext = <T extends AnyObject>(
  { columns, fetchDataResponse, rowSelection, isFilter = true, textPlaceholder }: DataTableContextProps<T>,
  ref: React.Ref<DataTableContextRef>,
) => {
  const { data, total, isLoading, fetchData, setParams, params } = usePagination<T>(fetchDataResponse, {
    search: '',
    page: 1,
    pageSize: 10,
  })
  const id = useId()
  const handleSearch = useCallback((value: string) => {
    console.log('Search query:', value)
    setParams({
      ...params,
      search: value,
    })
  }, [])

  const reloadTable = useCallback(() => {
    fetchData(params)
  }, [fetchData, params])

  useImperativeHandle(ref, () => ({
    reloadTable,
    isLoading,
  }))

  return (
    <>
      {isFilter && <TableFilterHeader onSearch={handleSearch} placeholder={textPlaceholder} />}

      <Table
        key={id}
        rowKey={(record) => record?._id || record?.id}
        columns={columns}
        dataSource={data || []}
        rowSelection={rowSelection}
        loading={isLoading}
        pagination={{
          total,
          current: params.page,
          pageSize: params.pageSize || params.limit,
        }}
        onChange={(pagination) =>
          setParams({
            page: pagination.current || 1,
            pageSize: pagination.pageSize || 10,
          })
        }
        footer={() => (
          <div className="font-medium">
            Trang {params.page} / {params.pageSize} trong tổng {total}
          </div>
        )}
      />
    </>
  )
}

export default forwardRef(DataTableContext) as <T extends AnyObject>(
  props: DataTableContextProps<T> & { ref?: React.Ref<DataTableContextRef> },
) => JSX.Element
