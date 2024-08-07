import { updateStatusOrder } from '@/actions/order.action'
import { useToast } from '@/libs/providers/toast-provider'
import { Button, Modal, Spin } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type ConfirmDeleteOrderProps = {
  isOpen: boolean
  label?: string
  handleRefetch: () => void
  idDelete: string
}

export function ConfirmDeleteOrder({ isOpen, label, handleRefetch, idDelete }: ConfirmDeleteOrderProps) {
  const [isShowDialog, setIsShowDialog] = useState(isOpen)
  const toast = useToast()
  console.log('open ', isOpen, isShowDialog)

  //   useEffect(() => {
  //     if (isOpen) {
  //       setIsShowDialog(true)
  //     } else {
  //       setIsShowDialog(false)
  //     }
  //   }, [])

  const handleSubmit = useCallback(async () => {
    console.log('run submit confirm')
    await updateStatusOrder(idDelete, 'Cancelled')
    toast.success('Cập nhật trạng thái đơn thành công')
    handleRefetch()
    setIsShowDialog(false)
  }, [])
  const handleClose = () => {
    setIsShowDialog(false)
  }
  return (
    <Modal centered width={300} open={isShowDialog} onClose={handleClose} footer={null} closable={false}>
      <div style={{ textAlign: 'center' }}>
        <div className="font-medium mb-2 text-lg">Bạn chắc chắn muốn huỷ đơn này "{label}"</div>
        <div className="flex flex-row items-center justify-around">
          <Button type="default" onClick={handleClose}>
            Đóng
          </Button>
          <Button className="bg-blue-500" type="primary" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
      </div>
    </Modal>
  )
}
