import { useEffect, useMemo } from 'react'
import { Button, Drawer, Form, Input, Select } from 'antd'
import { useToast } from '@/libs/providers/toast-provider'
import { createBlog, updateBlog } from '@/actions/blog.action'
import MarkdownEditor from '@/components/shared/common/MarkdowEditor'
import { useGetCategoryBlog } from '@/libs/hooks/useGetCategoryBlog'
import { IBlog } from '@/types/blog'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: IBlog | null
  onRefetchingTable: () => void
}

export function CreateUpdateBlogForm({ open, updateValue, onCancel, onRefetchingTable }: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()
  const { isLoading, categoryBlogData, refreshCategories } = useGetCategoryBlog()

  useEffect(() => {
    if (open) {
      refreshCategories()
      form.setFieldsValue(updateValue || resetFieldForm())
    }
  }, [open, refreshCategories, form, updateValue])

  const labelForm = useMemo(() => {
    return updateValue ? 'Cập nhật' : 'Tạo'
  }, [updateValue])

  const handleSubmit = async (values: any) => {
    try {
      if (updateValue) {
        const res = await updateBlog(updateValue._id, values)
        if (res && res.success) {
          toast.success('Cập nhật bài viết thành công')
          onCancel()
          onRefetchingTable()
        }
      } else {
        const res = await createBlog(values)
        if (res && res.success) {
          toast.success('Tạo bài viết thành công')
          onCancel()
          onRefetchingTable()
        }
      }
    } catch (err) {
      const action = updateValue ? 'Cập nhật' : 'Tạo'
      toast.error(`${action} bài viết thất bại`)
      console.error(`Error ${action.toLowerCase()} blog`, err)
    }
  }

  const resetFieldForm = () => {
    return {
      title: '',
      category: '',
      description: '',
    }
  }

  return (
    <Drawer
      title={`${labelForm} bài viết`}
      onClose={() => {
        form.resetFields()
        onCancel()
      }}
      open={open}
      width={700}
      footer={
        <div className="flex flex-row justify-end">
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  handleSubmit(values)
                })
                .catch((info) => {
                  console.log('Validate Failed:', info)
                })
            }}
            className="bg-blue-500"
          >
            {labelForm} bài viết
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={updateValue || resetFieldForm()}>
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
          label="Nội dung bài viết"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống nội dung bài viết',
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
      </Form>
    </Drawer>
  )
}
