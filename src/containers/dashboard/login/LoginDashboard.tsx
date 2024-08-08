'use client'
import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useAuth } from '@/libs/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { useToast } from '@/libs/providers/toast-provider'
type Props = {}

export function LoginDashboard({}: Props) {
  const { setUser, user, loginAdmin } = useAuth()
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    const { email, password } = values
    await loginAdmin?.(email, password)

    setLoading(false)
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen my-auto">
      <div className="border p-7 shadow w-[400px]">
        {/* <Link
        href={"/"}
        className="flex flex-row items-center justify-center font-semibold text-lg"
      >
        <span>Themes</span> <span className="text-primary">Ui</span>
      </Link> */}
        <div className="text-center mb-3 font-semibold text-lg">Đăng nhập trình quản lý</div>
        <Form
          name="normal_login"
          className=" mx-auto h-auto "
          initialValues={{ remember: true }}
          onFinish={onFinish}
          title=" Đăng nhập trình quản lý"
        >
          <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full bg-primary" loading={loading}>
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  )
}
