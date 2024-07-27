'use client'
import { useEffect, useMemo, useState } from 'react'

import { useToast } from '@/libs/providers/toast-provider'
import { Form, Input, InputNumber, Modal, Radio, Select, Upload } from 'antd'

import { IProduct } from '@/types/product'
import { useGetCategory } from '@/libs/hooks/useGetCategory'
import { createProduct, updateProduct } from '@/actions/product.action'
import ImageUploadField from '@/components/shared/upload-image/ImageUploadField'
import { OverlayLoadingModal } from '@/components/shared/common/OverlayLoadingModal'
import MarkdownEditor from '@/components/shared/common/MarkdowEditor'
import ImageUploadRaw from '@/components/shared/upload-image/ImageUploadRaw'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: IProduct | null
  onRefetchingTable: () => void
}

export function CreateUpdateProductForm({ open, updateValue, onCancel, onRefetchingTable }: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()
  const { isLoading, categoryData } = useGetCategory()
  const [isLoadingForm, setIsLoadingForm] = useState(false)
  const [thumbnail, setThumbnail] = useState<any[]>([])
  const [images, setImages] = useState<any[]>([])

  const labelForm = useMemo(() => {
    return updateValue ? 'Cập nhật' : 'Tạo sản phẩm'
  }, [updateValue])

  useEffect(() => {
    if (updateValue) {
      setThumbnail([updateValue?.thumbnail])
      setImages(updateValue?.images || [])
    } else {
      resetImageUpload()
    }
  }, [updateValue, open])

  const onCreate = async (values: any) => {
    setIsLoadingForm(true)
    // if (thumbnail[0]) {
    // formData.append('thumbnail', thumbnail[0].originFileObj || thumbnail[0].url);
    // }

    // images.forEach((file) => {
    // formData.append('images', file.originFileObj || file.url);
    // });

    // const formatThumbnail = thumbnail[0]?.uid ? [thumbnail[0]?.url] : thumbnail
    // const formatImage = images.map((img) => (img?.uid ? img?.url : img))
    const dataPayload = { ...values, thumbnail: thumbnail, images: images }
    console.log('data payload', dataPayload)
    try {
      let res
      if (updateValue) {
        res = await updateProduct(updateValue._id, dataPayload)
        if (res && res.success) {
          toast.success('Cập nhật sản phẩm thành công')
          onCancel()
          resetImageUpload()
          onRefetchingTable()
        }
      } else {
        res = await createProduct(dataPayload)
        if (res && res.success) {
          toast.success('Tạo sản phẩm thành công')
          onCancel()
          resetImageUpload()
          onRefetchingTable()
        }
      }
    } catch (error) {
      const errorMessage = updateValue ? 'Cập nhật sản phẩm thất bại' : 'Tạo sản phẩm thất bại'
      toast.error(errorMessage)
      console.error('Error:', error)
    } finally {
      setIsLoadingForm(false)
    }
  }

  const resetFieldForm = () => {
    return {
      title: '',
      description: '',
      category: '',
      price: 0,
      quantity: 0,
      size: '',
      color: '',
      brand: '',
      images: [],
      thumbnail: [],
      code: '',
    }
  }

  const resetImageUpload = () => {
    setThumbnail([])
    setImages([])
  }

  const formatterVND = (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const parserVND = (value: any) => value.replace(/\$\s?|(,*)/g, '')

  const handleThumbChange = (url: string) => {
    setThumbnail([...thumbnail, url])
  }

  const handleThumbRemove = (url: string) => {
    setThumbnail(thumbnail.filter((image) => image !== url))
  }
  const handleImageChange = (url: string) => {
    setImages([...images, url])
  }
  const handleImageRemove = (url: string) => {
    setImages(images.filter((image) => image !== url))
  }

  console.log(thumbnail, 'thumbnail')
  return (
    <>
      <Modal
        width={950}
        open={open}
        title={`${labelForm} sản phẩm`}
        okText={`${labelForm}`}
        okButtonProps={{ style: { background: '#1a94c4' }, loading: isLoadingForm }}
        cancelText="Cancel"
        onCancel={() => {
          form.resetFields()
          resetFieldForm()
          resetImageUpload()
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
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
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
              <Form.Item name="code" label="Mã sản phẩm">
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
                    form.setFieldsValue({ categoryId: value })
                  }}
                  allowClear
                  loading={isLoading}
                  options={(categoryData || []).map((cate) => ({
                    value: cate._id,
                    label: cate.title,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="brand"
                label="Thương hiệu"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không để trống thương hiệu',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="grid grid-cols-2 gap-1">
                <Form.Item name="color" label="Màu sắc">
                  <Input />
                </Form.Item>
                <Form.Item name="size" label="size">
                  <Input />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Form.Item
                  name="price"
                  label="Giá"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không để trống giá',
                    },
                  ]}
                >
                  <InputNumber formatter={formatterVND} parser={parserVND} style={{ width: '100%' }} suffix={'VND'} />
                </Form.Item>
                <Form.Item name="quantity" label="Số  lượng">
                  <InputNumber formatter={formatterVND} parser={parserVND} style={{ width: '100%' }} />
                </Form.Item>
              </div>
              <Form.Item
                name="description"
                label="Mô tả sản phẩm"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không để trống Mô tả sản phẩm',
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
            </div>

            <div className="col-span-1">
              <Form.Item label="Ảnh đại diện">
                {/* <ImageUploadField fileList={thumbnail} setFileList={setThumbnail} /> */}
                <ImageUploadRaw value={thumbnail} onChange={handleThumbChange} onRemove={handleThumbRemove} />
              </Form.Item>
              <Form.Item label="Ảnh mô tả">
                {/* <ImageUploadField fileList={images} setFileList={setImages} multiple /> */}
                <ImageUploadRaw value={images} onChange={handleImageChange} onRemove={handleImageRemove} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <OverlayLoadingModal isOpen={isLoadingForm} label={labelForm} />
    </>
  )
}
