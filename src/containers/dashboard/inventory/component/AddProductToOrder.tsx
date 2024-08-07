import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form, Input, InputNumber, Popconfirm, Select, Table } from 'antd'
import type { InputRef } from 'antd'
import type { FormInstance } from 'antd/es/form'
import { IItemsImport } from '@/types/inventory'
import { useGetProducts } from '@/libs/hooks/useGetProducts'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { formatterVND, parseNumber, parserVND } from '@/libs/helpers/parser'

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  productId: { value: string; label: string }
  quantity: number
  importPrice: number
  salePrice: number
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
  products: { value: string; label: string }[]
  isLoading: boolean
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  products,
  isLoading,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef | any>(null)
  const selectRef = useRef<any>(null)
  const form = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      if (dataIndex === 'productId') {
        selectRef.current?.focus()
      } else {
        inputRef.current?.focus()
      }
    }
  }, [editing, dataIndex])

  const toggleEdit = () => {
    setEditing(!editing)
    if (dataIndex === 'productId') {
      form?.setFieldsValue({ [dataIndex]: record[dataIndex]?.value })
    } else {
      form?.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }
  }
  const productOptions = useMemo(() => {
    return products?.map((item: any) => ({
      value: item?._id,
      label: `${item?.title} - ${item.code}`,
    }))
  }, [products?.length])

  const save = async () => {
    try {
      const values = await form?.validateFields()
      toggleEdit()
      if (dataIndex === 'productId') {
        const selectedProduct = productOptions.find((product) => product.value === values[dataIndex])
        console.log('selected product', selectedProduct)
        handleSave({ ...record, [dataIndex]: selectedProduct as any })
      } else {
        handleSave({ ...record, ...values })
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} không được để trống.`,
          },
        ]}
      >
        {dataIndex === 'productId' ? (
          <Select
            ref={selectRef}
            onBlur={save}
            onChange={save}
            options={productOptions}
            loading={isLoading}
            allowClear
          />
        ) : (
          //   <Input ref={inputRef} onPressEnter={save} onBlur={save} type="number" fo />
          <InputNumber
            ref={inputRef}
            formatter={formatterVND}
            parser={parserVND}
            onPressEnter={save}
            onBlur={save}
            style={{ width: '100%' }}
          />
        )}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {dataIndex === 'productId' ? record[dataIndex]?.label : children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]
type DataType = {
  key: string | number
  productId: { value: string; label: string }
  quantity: number
  importPrice: number
  salePrice: number
}
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const AddProductToOrder = ({
  isOpen,
  getValuePayload,
  getTotalCost,
}: {
  isOpen: boolean
  getValuePayload: (data: DataType[]) => void
  getTotalCost: (total: number) => void
}) => {
  const { productData, refreshProducts, isLoading } = useGetProducts()
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      productId: { value: 'chon san pham', label: 'Chọn sản phẩm' },
      quantity: 0,
      importPrice: 0,
      salePrice: 0,
    },
  ])

  useEffect(() => {
    if (isOpen) {
      setDataSource([])
      refreshProducts() // Call the API once when the component is opened
    }
  }, [isOpen, refreshProducts])

  const [count, setCount] = useState(2)

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key)
    setDataSource(newData)
  }

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      width: '30%',
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      editable: true,
      render: (_, { quantity }) => {
        return <div>{parseNumber(quantity)}</div>
      },
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      editable: true,
      render: (_, { importPrice }) => {
        return <div>{parseNumber(importPrice, 'VND')}</div>
      },
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      editable: true,
      render: (_, { salePrice }) => {
        return <div>{parseNumber(salePrice, 'VND')}</div>
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
            okButtonProps={{ danger: true }}
            okText="Xác nhận"
          >
            <Button danger icon={<RiDeleteBin6Line />} className="" />
          </Popconfirm>
        ) : null,
    },
  ]

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      productId: { value: 'chon san pham', label: 'Chọn sản phẩm' },
      quantity: 0,
      salePrice: 0,
      importPrice: 0,
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }

  const handleSave = (row: DataType) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: (props: EditableCellProps) => (
        <EditableCell {...props} products={productData as any} isLoading={isLoading} />
      ),
    },
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  useEffect(() => {
    getValuePayload(dataSource)
    const totalCost = dataSource.reduce((acc: number, item: any) => {
      return acc + item.quantity * item.importPrice
    }, 0)
    getTotalCost(totalCost)
  }, [dataSource, getValuePayload])

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }} className="bg-blue-500">
        Thêm sản phẩm
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  )
}

export default AddProductToOrder
