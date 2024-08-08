import { useMemo } from 'react'

import { useToast } from '@/libs/providers/toast-provider'
import { Form, Input, Modal, Radio } from 'antd'

import { ICategory } from '@/types/category'
import { createCategory, updateCategory } from '@/actions/category.action'

interface Values {
  title: string
  description: string
  modifier: string
}
interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: ICategory | null
  onRefetchingTable: () => void
}

export function CreateUpdateCategoryForm({
  open,
  updateValue,
  onCancel,
  onRefetchingTable,
}: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()

  const labelForm = useMemo(() => {
    return updateValue ? 'Cập nhật' : 'Tạo'
  }, [updateValue])

  const onCreate = async (values: any) => {
    if (updateValue) {
      try {
        const res = await updateCategory(updateValue._id, values)
        if (res && res.success) {
          toast.success('Cập nhật danh mục thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Cập nhật danh mục thất bai')
        console.log('error create user', err)
      }
    } else {
      try {
        const res = await createCategory(values)
        if (res && res.success) {
          toast.success('Tạo danh mục thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Tạo danh mục thất bai')
        console.log('error create user', err)
      }
    }
  }
  const resetFieldForm = () => {
    return {
      title: '',
    }
  }

  return (
    <Modal
      open={open}
      title={`${labelForm} danh mục`}
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
          form.setFieldsValue(updateValue || resetFieldForm())
        }
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={updateValue || resetFieldForm()}>
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
      </Form>
    </Modal>
  )
}
