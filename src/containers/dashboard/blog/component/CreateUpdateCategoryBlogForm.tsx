import { useMemo } from 'react'

import { Form, Input, Modal } from 'antd'
import { useToast } from '@/libs/providers/toast-provider'
import { createCategoryBlog, updateCategoryBlog } from '@/actions/category-blog.action'
import { ICategoryBlog } from '@/types/blog'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: ICategoryBlog | null
  onRefetchingTable: () => void
}

export function CreateUpdateCategoryBlogForm({
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
        const res = await updateCategoryBlog(updateValue._id, values)
        if (res && res.success) {
          toast.success('Cập nhật danh mục bài viết thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Cập nhật danh mục bài viết thất bai')
        console.log('error create user', err)
      }
    } else {
      try {
        const res = await createCategoryBlog(values)
        if (res && res.success) {
          toast.success('Tạo danh mục bài viết thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Tạo danh mục bài viết thất bai')
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
      title={`${labelForm} danh mục bài viết`}
      okText={`${labelForm}`}
      okButtonProps={{
        style: {
          background: '#1a94c4',
        },
      }}
      cancelText="Cancel"
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
              message: 'Vui lòng không để trống ',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
