import { createSettingThemeHeader } from '@/actions/theme.action'
import ImageUploadRaw from '@/components/shared/upload-image/ImageUploadRaw'
import { useToast } from '@/libs/providers/toast-provider'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'

type Props = {}

export default function SettingHeaderOption({}: Props) {
  const [form] = Form.useForm()
  const [imageHeader, setImageHeader] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const handleSubmit = async (values: any) => {
    try {
      await createSettingThemeHeader({ ...values, image: imageHeader[0] })
      toast.success('Tạo theme header thành công')
      resetForm()
      setImageHeader([])
    } catch (error) {
      console.log('Create theme header failed', error)
    }
    console.log('value tao ', { ...values, images: imageHeader })
  }
  const handleUploadChange = (url: string) => {
    setImageHeader([...imageHeader, url])
  }
  const handleImgRemove = (url: string) => {
    setImageHeader(imageHeader.filter((image) => image !== url))
  }
  const resetForm = () => {
    return {
      title: '',
    }
  }
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        className="w-2/3 my-3"
        onFinish={handleSubmit}
        initialValues={resetForm()}
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
        <Form.Item label="Tải ảnh theme header">
          <ImageUploadRaw value={imageHeader} onChange={handleUploadChange} onRemove={handleImgRemove} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500" loading={isLoading} disabled={isLoading}>
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
