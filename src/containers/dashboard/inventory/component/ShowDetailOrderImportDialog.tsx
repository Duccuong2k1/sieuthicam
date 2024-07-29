import { TitleContentRow } from '@/components/shared/common/TitleContentRow'
import { formatDate, parseNumber } from '@/libs/helpers/parser'
import { IInventory, IItemsImport } from '@/types/inventory'
import { IOrder, IOrderProduct, STATUS_ORDER } from '@/types/order'
import { IProduct } from '@/types/product'
import { Image, Modal, Table, TableColumnsType, Tag } from 'antd'
import { useMemo } from 'react'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  detailItem: IInventory | null
}

export function ShowDetailOrderImportDialog({ open, detailItem, onCancel }: CollectionCreateFormProps) {
  const labelForm = `Chi tiết thông tin đơn hàng`
  console.log('detail product', detailItem)
  return (
    <Modal
      width={800}
      open={open}
      title={labelForm}
      okText="Đóng"
      okButtonProps={{
        style: {
          background: '#1a94c4',
        },
      }}
      cancelText="Cancel"
      onCancel={() => {
        onCancel()
      }}
      onOk={() => {
        onCancel()
      }}
    >
      <div className="border-t ">
        <div className="grid grid-cols-2 gap-2 mt-2">
          <TitleContentRow label="Mã đơn" content={detailItem?.code} />
          <TitleContentRow label="Ngày tạo" content={formatDate(detailItem?.createdAt || '', 'dd/MM/yyyy - HH:mm')} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <TitleContentRow label="Tên người nhập" content={detailItem?.importInventoryBy} />
        </div>

        <div className="mt-3 text-lg font-bold ">Sản phẩm nhập:</div>
        <>
          <ProductListOrder productList={detailItem?.items} />
        </>
        <TitleContentRow
          label="Tổng tiền"
          content={<span className="text-green-500 font-bold">{parseNumber(detailItem?.totalCost, 'VND')}</span>}
          className="text-lg my-4"
        />
      </div>
    </Modal>
  )
}

function ProductListOrder({ productList }: { productList: IOrderProduct | any }) {
  const columns: TableColumnsType<IItemsImport> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      key: 'product',
      render: (_, { productId }) => (
        <>
          <div className="flex flex-row items-center gap-2">
            <Image src={productId?.thumbnail} alt="Image product order" width={50} height={50} />
            <span>{productId?.title}</span>
          </div>
        </>
      ),
      width: 300,
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      key: 'importPrice',
      render: (_, { importPrice }) => (
        <>
          <div className="">{parseNumber(importPrice, 'VND')}</div>
        </>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (_, { salePrice }) => (
        <>
          <div className="">{parseNumber(salePrice, 'VND')}</div>
        </>
      ),
    },
    {
      title: 'Số lượng nhập',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, { quantity }) => (
        <>
          <div className="">{parseNumber(quantity)}</div>
        </>
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total',
      key: 'total',
      render: (_, { importPrice, quantity }) => (
        <>
          <div className="">{parseNumber(importPrice * quantity, 'VND')}</div>
        </>
      ),
    },
  ]
  return <Table columns={columns} dataSource={productList} pagination={false} className="border" />
}
