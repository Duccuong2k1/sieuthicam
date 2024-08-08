import { registerAccount } from '@/actions/auth.action'
import { useToast } from '@/libs/providers/toast-provider'
import { Form, Input, Modal, Radio } from 'antd'
import { useUserContext } from '../provider/user-provider'
import { IUser } from '@/types/user'
import { useMemo } from 'react'
import { updateUserByAdmin } from '@/actions/user.action'

interface Values {
  title: string
  description: string
  modifier: string
}
interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValueUser: IUser | null
  onRefetchingTable: () => void
}

export function CreateUpdateUserForm({
  open,
  updateValueUser,
  onCancel,
  onRefetchingTable,
}: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()
  const { refreshUserList } = useUserContext()

  const labelForm = useMemo(() => {
    return updateValueUser ? 'Cập nhật' : 'Tạo'
  }, [updateValueUser])

  const onCreate = async (values: any) => {
    if (updateValueUser) {
      try {
        const res = await updateUserByAdmin(updateValueUser._id, values)
        if (res && res.success) {
          toast.success('Cập nhật tài khoản thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Cập nhật tài khoản thất bai')
        console.log('error create user', err)
      }
    } else {
      try {
        const res = await registerAccount(values)
        if (res && res.success) {
          toast.success('Tạo tài khoản thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Tạo tài khoản thất bai')
        console.log('error create user', err)
      }
    }
  }
  const resetFieldForm = () => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      role: 'user',
    }
  }

  return (
    <Modal
      open={open}
      title={`${labelForm} tài khoản`}
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
          form.setFieldsValue(updateValueUser || resetFieldForm())
        }
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={updateValueUser || resetFieldForm()}>
        <Form.Item
          name="firstName"
          label="Tên"
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
          name="lastName"
          label="Họ + tên đệm"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống họ',
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
              message: 'Vui lòng không để trống email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống SĐT',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {!updateValueUser?._id && (
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trống Mật này',
              },
            ]}
          >
            <Input type="password" />
          </Form.Item>
        )}
        {/* <Form.Item name="address" label="Địa chỉ">
          <Input type="textarea" />
        </Form.Item> */}
        <Form.Item name="role" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="admin">Admin</Radio>
            <Radio value="user">User</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
