import { useToast } from '@/libs/providers/toast-provider'
import { Button, Form, Input } from 'antd'

import { useGetCategory } from '@/libs/hooks/useGetCategory'
import { createSettingGlobal, getInfoSettingSystem } from '@/actions/setting-global'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ISettingGlobal } from '@/types/setting-global'
import ImageUploadRaw from '@/components/shared/upload-image/ImageUploadRaw'

interface CollectionCreateFormProps {}

export function SettingInfoSystemTab({}: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [logo, setLogo] = useState<any[]>([])
  const [banners, setBanners] = useState<any[]>([])

  useEffect(() => {
    const fetchSettingSystemInfo = async () => {
      try {
        const res = await getInfoSettingSystem()
        if (res) {
          form.setFieldsValue(res?.data) // Update form values when data is fetched
          setLogo([res?.data?.logo])
          setBanners(res?.data?.banners)
        }
      } catch (err) {
        console.log('Get info setting failed', err)
      }
    }

    fetchSettingSystemInfo()
  }, [form])

  const handleSubmit = async (values: any) => {
    console.log('data nhan ve', values)
    setIsLoading(true)
    const dataPayload = { ...values, logo: logo, banners: banners }
    try {
      await createSettingGlobal(dataPayload)
      toast.success('Cập nhật thông tin thành công')
      router.refresh()
    } catch (error) {
      console.log('Cập nhật thất bại', error)
      toast.success('Cập nhật thông tin thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoChange = (url: string) => {
    setLogo([...logo, url])
  }
  const handleLogoRemove = (url: string) => {
    setLogo(logo.filter((image) => image !== url))
  }
  const handleBannerChange = (url: string) => {
    setBanners([...banners, url])
  }
  const handleBannerRemove = (url: string) => {
    setBanners(banners.filter((image) => image !== url))
  }
  const resetFieldForm = () => {
    return {
      title: '',
      description: '',
      email: '',
      phone: '',
      address: '',
      facebook: '',
    }
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        className="w-2/3"
        onFinish={handleSubmit}
        // initialValues={resetFieldForm()}
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
          name="description"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống mô tả',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống Email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống địa chỉ',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="grid grid-cols-2 gap-1">
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trống phone',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="facebook" label="Link facebook">
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Logo website">
          <ImageUploadRaw value={logo} onChange={handleLogoChange} onRemove={handleLogoRemove} />
        </Form.Item>
        <Form.Item label="Banners">
          <ImageUploadRaw value={banners} onChange={handleBannerChange} onRemove={handleBannerRemove} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500" loading={isLoading} disabled={isLoading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
