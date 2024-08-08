import { useEffect, useMemo } from 'react'

import { useToast } from '@/libs/providers/toast-provider'
import { Form, Input, Modal, Select } from 'antd'

import { IBrand } from '@/types/category'

import { useGetCategory } from '@/libs/hooks/useGetCategory'
import { createBrand, getBrands, updateBrand } from '@/actions/brand.action'

interface Values {
  title: string
  description: string
  modifier: string
}
interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: IBrand | null
  onRefetchingTable: () => void
}

export function CreateUpdateBrandForm({ open, updateValue, onCancel, onRefetchingTable }: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()

  const { isLoading, categoryData, refreshCategories } = useGetCategory()
  useEffect(() => {
    if (open) {
      refreshCategories()
    }
  }, [open])
  const labelForm = useMemo(() => {
    return updateValue ? 'Cập nhật' : 'Tạo'
  }, [updateValue])

  const onCreate = async (values: any) => {
    if (updateValue) {
      try {
        const res = await updateBrand(updateValue._id, values)
        if (res && res.success) {
          toast.success('Cập nhật loại hình thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Cập nhật loại hình thất bai')
        console.log('error create user', err)
      }
    } else {
      try {
        const res = await createBrand(values)
        if (res && res.success) {
          toast.success('Tạo loại hình thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Tạo loại hình thất bai')
        console.log('error create user', err)
      }
    }
  }
  const resetFieldForm = () => {
    return {
      title: '',
      categoryId: '',
    }
  }

  return (
    <Modal
      open={open}
      title={`${labelForm} loại hình`}
      okText={`${labelForm}`}
      okButtonProps={{
        style: {
          background: '#1a94c4',
        },
      }}
      cancelText="Huỷ"
      onCancel={() => {
        form.resetFields()
        resetFieldForm()
        onCancel()
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
      afterOpenChange={(open) => {
        if (open) {
          form.setFieldsValue(
            {
              title: updateValue?.title,
              categoryId: updateValue?.category?._id,
            } || resetFieldForm(),
          )
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ ...updateValue, categoryId: updateValue?.category?._id } || resetFieldForm()}
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống tên',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="categoryId"
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
              form.setFieldsValue({ categoryId: value })
            }}
            allowClear
            loading={isLoading}
            options={(categoryData || []).map((cate) => ({
              value: cate._id,
              label: cate.title,
            }))}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
