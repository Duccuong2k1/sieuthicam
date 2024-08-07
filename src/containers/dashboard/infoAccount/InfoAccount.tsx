'use client'
import React, { useEffect, useState } from 'react'
import { RequiredMark } from 'antd/es/form/Form'
import { Button, Form, Input, Radio } from 'antd'

import { useAuth } from '@/libs/providers/auth-provider'
import { useToast } from '@/libs/providers/toast-provider'
import { changeInfoAccount } from '@/actions/user.action'
import { useRouter } from 'next/navigation'

type Props = {}

export function InfoAccount({}: Props) {
  const [form] = Form.useForm()
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional')

  const { admin } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue)
  }

  useEffect(() => {
    if (admin) {
      form.setFieldsValue({
        email: admin.email,
        firstName: admin.firstName,
        phone: admin.phone,
        role: admin.role,
        address: admin.address,
      })
    }
  }, [admin])

  const onFinish = async (values: any) => {
    try {
      const res = await changeInfoAccount(values)
      if (res && res.success) {
        toast.success('Cập nhật tài khoản thành công')
        router.refresh()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <div className="font-semibold text-xl my-3">Thông tin tài khoản</div>

      <Form
        style={{ width: 700 }}
        form={form}
        layout="vertical"
        initialValues={{
          email: admin?.email,
          firstName: admin?.firstName,
          phone: admin?.phone,
          role: admin?.role,
          address: admin?.address,
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        onFinish={(values) => onFinish(values)}
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Tên tài khoản" name="firstName">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="Số điện thoại" name={'phone'}>
          <Input placeholder="" />
        </Form.Item>
        <Form.Item name="role" label="Vai trò" className="">
          <Radio.Group>
            <Radio value="admin">Admin</Radio>
            <Radio value="member">Member</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address">
          <Input placeholder="" />
        </Form.Item>

        <Form.Item className="flex justify-end flex-row items-end">
          <Button htmlType="submit">Cập nhật thông tin</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
