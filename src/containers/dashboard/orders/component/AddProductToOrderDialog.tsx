'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useToast } from '@/libs/providers/toast-provider'
import { Form, Input, InputNumber, Modal, Radio, Select, Upload } from 'antd'
import { createProduct, updateProduct } from '@/actions/product.action'

import { UNIT_OPTIONS } from '@/libs/constants/product'
import { formatterVND, parserVND } from '@/libs/helpers/parser'
import { useGetProducts } from '@/libs/hooks/useGetProducts'

import { IProductAddOrder } from '@/types/order'
import { useOrder } from '@/libs/providers/order-provider'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
}

export function AddProductToOrderDialog({ open, onCancel }: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()

  const [isLoadingForm, setIsLoadingForm] = useState(false)

  const { productData, refreshProducts, isLoading } = useGetProducts()
  const { productAddOrderList, setProductAddOrderList } = useOrder()
  const [selectedUnit, setSelectedUnit] = useState('bag')
  const [dataSelectedOption, setDataSelectedOption] = useState({ salePrice: 0, productLabel: '' })

  const onCreate = async (values: IProductAddOrder) => {
    setIsLoadingForm(true)
    try {
      const [productId, salePrice] = values?.productId ? values?.productId.split('&&') : []

      const dataAddOrder = {
        productId: productId,
        weight: values?.weight || 0,
        quantity: values?.quantity || 0,
        salePrice: values?.salePrice,
        unit: values?.unit,
        productLabel: dataSelectedOption?.productLabel,
      }

      toast.success('Thêm sản phẩm thành công.!!!')
      setProductAddOrderList([dataAddOrder, ...productAddOrderList])
      setSelectedUnit('bag')
      onCancel()
    } catch (error) {
      const errorMessage = 'Thêm sản phẩm thất bại'
      toast.error(errorMessage)
      console.error('Error:', error)
    } finally {
      setIsLoadingForm(false)
    }
  }

  const resetFieldForm = () => {
    return {
      productId: '',
      salePrice: 0,
      weight: 0,
      unit: 'bag',
    }
  }

  const handleProductChange = (value: string, option: any) => {
    const [productId, salePrice] = value.split('&&')
    const productLabel = option.label
    setDataSelectedOption({ salePrice: parseFloat(salePrice), productLabel: productLabel })
    form.setFieldsValue({
      productId: `${productId}&&${salePrice}`,
      salePrice: parseFloat(salePrice),
    })
  }

  return (
    <>
      <Modal
        width={700}
        open={open}
        title={`Thêm sản phẩm`}
        okText={`Xác nhận`}
        okButtonProps={{ style: { background: '#1a94c4' }, loading: isLoadingForm }}
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
            form.setFieldsValue(resetFieldForm())
          }
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal" initialValues={resetFieldForm()}>
          <Form.Item
            name="productId"
            label="Sản phẩm"
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trống sản phẩm',
              },
            ]}
          >
            <Select
              placeholder="Chọn sản phẩm"
              onChange={handleProductChange}
              allowClear
              loading={isLoading}
              options={(productData || []).map((item) => ({
                value: `${item._id}&&${item.salePrice}`,
                label: `${item?.title} - ${item.code}`,
              }))}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>
          <Form.Item name="salePrice" label={`${selectedUnit === 'kg' ? 'Giá bán lẻ' : 'Giá bán'}`}>
            <InputNumber formatter={formatterVND} parser={parserVND} style={{ width: '100%' }} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-1">
            <Form.Item
              name="unit"
              label="Bán theo dạng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không để trống đơn vị đo',
                },
              ]}
            >
              <Select
                options={UNIT_OPTIONS}
                onChange={(value) => setSelectedUnit(value)}
                value={selectedUnit}
                defaultValue={selectedUnit}
              />
            </Form.Item>

            {selectedUnit === 'kg' ? (
              <Form.Item name="weight" label="Trọng lượng">
                <InputNumber formatter={formatterVND} parser={parserVND} style={{ width: '100%' }} />
              </Form.Item>
            ) : (
              <Form.Item name="quantity" label="Số lượng">
                <InputNumber formatter={formatterVND} parser={parserVND} style={{ width: '100%' }} />
              </Form.Item>
            )}
          </div>
        </Form>
      </Modal>
    </>
  )
}
