import { useCallback, useMemo, useState } from 'react'
import { Button, Drawer, Form, Input, InputNumber } from 'antd'
import { useToast } from '@/libs/providers/toast-provider'

import { formatDate, formatterVND, parseNumber, parserVND } from '@/libs/helpers/parser'
import { IOrderDebit } from '@/types/order-debit'
import { paymentDebitOrder } from '@/actions/debit-order.action'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  onRefetchingTable: () => void
  infoDetailOrder: IOrderDebit | null
}

export function PaymentOrderDebitDialog({
  open,

  onCancel,
  onRefetchingTable,
  infoDetailOrder,
}: CollectionCreateFormProps) {
  const toast = useToast()
  const [form] = Form.useForm()
  const [isSubmit, setIsSubmit] = useState(false)
  const [remainingDebt, setRemainingDebt] = useState<number>(0)

  const handleSubmit = async () => {
    try {
      const paymentAmount = form.getFieldValue('paymentAmount')
      if (!paymentAmount || paymentAmount <= 0) {
        toast.error('Vui lòng nhập số tiền hợp lệ')
        return
      }

      if (infoDetailOrder?.orderId) {
        const res = await paymentDebitOrder({
          paymentAmount,
          orderId: infoDetailOrder?.orderId?._id,
        })

        if (res && res.success) {
          toast.success('Thanh toán nợ thành công')
          onCancel()
          onRefetchingTable()
          form.resetFields()
        } else {
          toast.error('Thanh toán nợ thất bại')
        }
      }
    } catch (err) {
      toast.error('Thanh toán nợ thất bại')
      console.error('Error during payment', err)
    } finally {
      setIsSubmit(false)
    }
  }

  const calculateRemainingDebt = useCallback(
    (amountPaid: number) => {
      // const outstandingAmount = infoDetailOrder?.totalAmountOutStanding || 0
      return totalAmountOutStanding() - amountPaid || 0
    },
    [infoDetailOrder],
  )

  const handleValuesChange = (_: any, allValues: { paymentAmount: number }) => {
    const amountPaid = allValues.paymentAmount || 0
    const newRemainingDebt = calculateRemainingDebt(amountPaid)
    setRemainingDebt(newRemainingDebt)
  }

  const totalAmountOutStanding = useCallback(() => {
    let result = 0
    if (infoDetailOrder) {
      result = +infoDetailOrder?.orderId?.totalCost - +infoDetailOrder?.totalAmountPaid
    }
    return result
  }, [infoDetailOrder])

  return (
    <Drawer
      title={`Thanh toán nợ`}
      onClose={() => {
        onCancel()
        form.resetFields()
      }}
      open={open}
      width={1000}
      footer={
        <div className="flex flex-row justify-end">
          <Button
            disabled={isSubmit}
            type="primary"
            onClick={() => {
              setIsSubmit(true)
              handleSubmit()
              // handleFormatPayload(values)
            }}
            className="bg-blue-500"
          >
            Xác nhận thanh toán
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div>
          Tên người mua: <span className="">{infoDetailOrder?.orderId?.buyerName}</span>
        </div>
        <div>
          SĐT: <span>{infoDetailOrder?.orderId?.buyerPhone}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div>
          Địa chỉ: <span>{infoDetailOrder?.orderId?.buyerAddress}</span>
        </div>
        <div>
          Ngày mua: <span>{formatDate(infoDetailOrder?.orderId?.createdAt || '', 'dd/MM/yyyy - HH:mm')}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <RowItemOrder
          label={' Tổng tiền'}
          value={infoDetailOrder?.orderId?.totalCost}
          type={'number'}
          className="text-blue-500"
        />
        <RowItemOrder
          label={' Tiền đã trả'}
          value={infoDetailOrder?.totalAmountPaid}
          type={'number'}
          className="text-green-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <RowItemOrder
          label={' Tiền còn nợ'}
          value={totalAmountOutStanding()}
          type={'number'}
          className="text-red-500"
        />
      </div>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        className="mt-5"
        initialValues={{ paymentAmount: 0 }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="paymentAmount"
          label="Nhập số tiền trả"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống số tiền',
            },
          ]}
        >
          <InputNumber formatter={formatterVND} parser={parserVND} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
      <RowItemOrder
        label={'Số tiền còn nợ sau khi thanh toán'}
        value={remainingDebt}
        type="number"
        className="text-red-500 text-lg"
      />
    </Drawer>
  )
}

function RowItemOrder({
  label,
  value,
  type = 'text',
  className,
}: {
  label: string
  value: any
  type?: 'text' | 'number'
  className?: string
}) {
  return (
    <div>
      {label} :{' '}
      <span className={`font-semibold  ${className}`}> {type === 'number' ? parseNumber(value, 'VND') : value}</span>
    </div>
  )
}
