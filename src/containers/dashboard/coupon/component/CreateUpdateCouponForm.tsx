import { useMemo } from 'react'

import { Form, Input, Modal, Radio } from 'antd'
import { ICoupon } from '@/types/coupon'
import { useToast } from '@/libs/providers/toast-provider'
import { createCoupon, updateCoupon } from '@/actions/coupon.action'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: ICoupon | null
  onRefetchingTable: () => void
}

export function CreateUpdateCouponForm({ open, updateValue, onCancel, onRefetchingTable }: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()

  const labelForm = useMemo(() => {
    return updateValue ? 'Cập nhật' : 'Tạo'
  }, [updateValue])

  const onCreate = async (values: any) => {
    if (updateValue) {
      try {
        const res = await updateCoupon(updateValue._id, values)
        if (res && res.success) {
          toast.success('Cập nhật khuyến mãi thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Cập nhật khuyến mãi thất bai')
        console.log('error create user', err)
      }
    } else {
      try {
        const res = await createCoupon(values)
        if (res && res.success) {
          toast.success('Tạo khuyến mãi thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Tạo khuyến mãi thất bai')
        console.log('error create user', err)
      }
    }
  }
  const resetFieldForm = () => {
    return {
      title: '',
      code: '',
      discount: 0,
      expiry: '',
    }
  }

  return (
    <Modal
      open={open}
      title={`${labelForm} khuyến mãi`}
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
              message: 'Vui lòng không để trống ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Mã code"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống ',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="discount"
          label="Giảm giá"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống ',
            },
          ]}
        >
          <Input placeholder="vd: 10%" />
        </Form.Item>
        <Form.Item
          name="expiry"
          label="Thời hạn hết hạn"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống ',
            },
          ]}
        >
          <Input placeholder="vd: 3 ngày" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
