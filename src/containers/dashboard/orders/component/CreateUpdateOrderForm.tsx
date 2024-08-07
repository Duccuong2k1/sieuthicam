'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Button, Drawer, Form, Input, Modal, Radio, Select } from 'antd'
import { IOrder, PAYMENT_METHOD_ORDER } from '@/types/order'
import { useToast } from '@/libs/providers/toast-provider'
import AddProductToOrderTable from './AddProductToOrderTable'
import { parseNumber } from '@/libs/helpers/parser'
import { createOrderByAdmin } from '@/actions/order.action'
import { AddProductToOrderDialog } from './AddProductToOrderDialog'
import OrderItemsTable from './OrderItemsTable'
import { useOrder } from '@/libs/providers/order-provider'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  updateValue: IOrder | null
  onRefetchingTable: () => void
}

export function CreateUpdateOrderForm({ open, updateValue, onCancel, onRefetchingTable }: CollectionCreateFormProps) {
  const [form] = Form.useForm()
  const toast = useToast()
  const [isSubmit, setIsSubmit] = useState(false)
  const [totalCost, setTotalCost] = useState<number>(0)

  const [openAddProduct, setOpenAddProduct] = useState(false)
  const { productAddOrderList, setProductAddOrderList } = useOrder()

  const labelForm = useMemo(() => {
    return updateValue ? 'Cập nhật' : 'Tạo'
  }, [updateValue])

  const onCreate = async (values: any) => {
    if (productAddOrderList?.length <= 0) {
      toast.error('Vui lòng thêm sản phẩm mua')
    } else {
      if (updateValue) {
        // try {
        console.log('update don hang')
        //   const res = await updateCoupon(updateValue._id,values);
        //   if (res && res.success) {
        //     toast.success("Cập nhật khuyến mãi thành công");
        //     onCancel();
        //     onRefetchingTable();
        //   }
        // } catch (err) {
        //   toast.error("Cập nhật khuyến mãi thất bai");
        //   console.log("error create user", err);
        // }
      } else {
        try {
          const productOrderItems = productAddOrderList?.map((item) => {
            return {
              productId: item.productId,
              salePrice: item.salePrice,
              quantity: item.quantity,
              unit: item.unit,
              weight: item.weight,
            }
          })
          const dataPayload = {
            ...values,
            items: productOrderItems,
          }
          console.log('values', dataPayload)
          const res = await createOrderByAdmin(dataPayload)
          if (res && res.success) {
            toast.success('Tạo đơn thành công')
            form.resetFields()

            onCancel()
            onRefetchingTable()
            setProductAddOrderList([])
          }
        } catch (err) {
          toast.error('Tạo đơn thất bai')
          console.log('error create order', err)
        }
      }
    }
  }

  // const handleFormatPayload = useCallback(
  //   (data: any) => {
  //     if (!isSubmit) return
  //     setIsSubmit(false)
  //     let dataPayload = []
  //     if (data) {
  //       dataPayload = data.map((item: any) => ({
  //         productId: item?.productId?.value,
  //         quantity: item?.quantity,
  //         salePrice: item?.salePrice,
  //       }))

  //       onCreate(dataPayload)
  //     }
  //   },
  //   [isSubmit],
  // )
  const resetFieldForm = () => {
    return {
      title: '',
      code: '',
      discount: '',
      expiry: '',
    }
  }

  return (
    <>
      <Drawer
        title={`${labelForm} đơn`}
        onClose={() => {
          onCancel()
          setProductAddOrderList([])
        }}
        open={open}
        width={1000}
        footer={
          <div className="flex flex-row justify-end">
            <Button
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    // setIsSubmit(true)
                    onCreate(values)
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info)
                  })
                // handleFormatPayload(values)
              }}
              className="bg-blue-500"
            >
              {labelForm} đơn
            </Button>
          </div>
        }
      >
        <Form form={form} layout="vertical" name="form_in_modal" initialValues={updateValue || resetFieldForm()}>
          <div className="grid grid-cols-2 gap-5">
            <Form.Item
              name="buyerName"
              label="Tên người mua"
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
              name="buyerPhone"
              label="Số diện thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không để trống sô điện thoại',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Form.Item
              name="buyerAddress"
              label="Địa chỉ giao hàng"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không để trống địa chỉ',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="paymentMethod"
              label="Hình thức thanh toán"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không để trống hình thức thanh toán',
                },
              ]}
            >
              <Select options={PAYMENT_METHOD_ORDER} />
            </Form.Item>
          </div>
        </Form>

        <Button
          onClick={() => setOpenAddProduct(true)}
          type="primary"
          style={{ marginBottom: 16 }}
          className="bg-blue-500"
        >
          Thêm sản phẩm
        </Button>
        <div className="font-bold text-lg ">Sản phẩm mua</div>
        <OrderItemsTable />
        {/* <AddProductToOrderTable
          isOpen={open}
          getValuePayload={handleFormatPayload}
          getTotalCost={(value) => setTotalCost(value)}
        /> */}
      </Drawer>
      <AddProductToOrderDialog open={openAddProduct} onCancel={() => setOpenAddProduct(false)} />
    </>
  )
}
