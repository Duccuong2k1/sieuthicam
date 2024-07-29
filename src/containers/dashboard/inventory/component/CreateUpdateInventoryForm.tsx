import { useCallback, useState } from 'react'
import { Button, Drawer, Form } from 'antd'
import { useToast } from '@/libs/providers/toast-provider'

import { IItemsImport } from '@/types/inventory'
import AddProductToOrder from './AddProductToOrder'
import { createInventory } from '@/actions/inventory.action'
import { parseNumber } from '@/libs/helpers/parser'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  onRefetchingTable: () => void
}

export function CreateUpdateInventoryForm({
  open,

  onCancel,
  onRefetchingTable,
}: CollectionCreateFormProps) {
  const toast = useToast()
  const [isSubmit, setIsSubmit] = useState(false)
  const [totalCost, setTotalCost] = useState<number>(0)

  const handleSubmit = async (values: IItemsImport[]) => {
    console.log('value nhan ve', values)
    if (!values || values.length === 0) {
      toast.error('Danh sách sản phẩm không được để trống')
      return
    }

    try {
      console.log('submit ', values)
      const res = await createInventory(values)
      if (res && res.success) {
        toast.success('Tạo đơn nhập hàng thành công')
        onCancel()
        onRefetchingTable()
      }
    } catch (err) {
      toast.error(`Tạo đơn nhập hàng thất bại`)
      console.error(`Error Tạo đơn nhập hàng`, err)
    } finally {
      setIsSubmit(false)
    }
  }

  const handleFormatPayload = useCallback(
    (data: any) => {
      if (!isSubmit) return
      setIsSubmit(false)
      let dataPayload = []
      if (data) {
        dataPayload = data.map((item: any) => ({
          productId: item?.productId?.value,
          quantity: item?.quantity,
          salePrice: item?.salePrice,
          importPrice: item?.importPrice,
        }))

        handleSubmit(dataPayload)
      }
    },
    [isSubmit],
  )
  console.log('open form', open)
  return (
    <Drawer
      title={`Tạo đơn nhập hàng`}
      onClose={() => {
        onCancel()
      }}
      open={open}
      width={1000}
      footer={
        <div className="flex flex-row justify-end">
          <Button
            type="primary"
            onClick={() => {
              setIsSubmit(true)
              // handleFormatPayload(values)
            }}
            className="bg-blue-500"
          >
            Tạo đơn nhập hàng
          </Button>
        </div>
      }
    >
      {/* <Form form={form} layout="vertical" name="form_in_modal" initialValues={updateValue || resetFieldForm()}>
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống tiêu đề',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Danh mục"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống danh mục',
            },
          ]}
        >
          <Select
            placeholder="Chọn danh mục"
            onChange={(value) => {
              form.setFieldsValue({ category: value })
            }}
            showSearch
            optionFilterProp="label"
            allowClear
            loading={isLoading}
            options={(categoryBlogData || []).map((cate) => ({
              value: cate._id,
              label: cate.title,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Nội dung đơn nhập hàng"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống nội dung đơn nhập hàng',
            },
          ]}
          valuePropName="value"
          getValueFromEvent={(content) => content}
        >
          <MarkdownEditor
            value={form.getFieldValue('description')}
            onChange={(content) => form.setFieldsValue({ description: content || '' })}
          />
        </Form.Item>
      </Form> */}
      <AddProductToOrder
        isOpen={open}
        getValuePayload={handleFormatPayload}
        getTotalCost={(value) => setTotalCost(value)}
      />
      <div className="text-right text-lg font-semibold mt-3">
        Tổng tiền: <span className="text-blue-500 ">{parseNumber(totalCost, 'VND')}</span>
        <p className="text-[11px] text-gray-400">(Giá nhập X Số lượng = Tổng tiền)</p>
      </div>
    </Drawer>
  )
}
