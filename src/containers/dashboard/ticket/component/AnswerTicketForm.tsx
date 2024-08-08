import { useToast } from '@/libs/providers/toast-provider'
import { Form, Input, Modal } from 'antd'

import { ITicket } from '@/types/ticket'
import { answerRequestTicket } from '@/actions/ticket.action'

interface Values {
  title: string
  description: string
  modifier: string
}
interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: ITicket | null
  onRefetchingTable: () => void
}

export function AnswerTicketForm({ open, onCancel, onRefetchingTable, updateValue }: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()

  const onCreate = async (values: any) => {
    if (updateValue) {
      try {
        const res = await answerRequestTicket(updateValue?._id, values)
        if (res && res.success) {
          toast.success('Phản hồi thành công thành công')
          onCancel()
          onRefetchingTable()
        }
      } catch (err) {
        toast.error('Phản hồi thành công thất bai')
        console.log('error required answer ticket', err)
      }
    }
  }

  const resetFieldForm = () => {
    return {
      message: '',
      description: '',
    }
  }

  return (
    <Modal
      open={open}
      title={`Phản hồi yêu cầu`}
      okText={`Xác nhận`}
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
        <Form.Item name="description" label="Mô tả ">
          <Input disabled={!!updateValue?._id} />
        </Form.Item>
        <Form.Item
          name="message"
          label="Trả lời"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống vào trả lời',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
