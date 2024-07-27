import { TitleContentRow } from '@/components/shared/common/TitleContentRow'
import { formatDate, parseNumber } from '@/libs/helpers/parser'
import { IOrder, IOrderProduct, STATUS_ORDER } from '@/types/order'
import { IProduct } from '@/types/product'
import { Image, Modal, Table, TableColumnsType, Tag } from 'antd'
import { useMemo } from 'react'

interface CollectionCreateFormProps {
  open: boolean
  onCancel: () => void
  detailItem: IOrder | null
}

export function ShowDetailOrderDialog({ open, detailItem, onCancel }: CollectionCreateFormProps) {
  const labelForm = `Chi tiết thông tin đơn hàng`

  const renderStatusOrder = useMemo(() => {
    return STATUS_ORDER.filter((item) => item.value === detailItem?.status).map((item) => (
      <Tag color={item.color} key={item.value}>
        {item.label.toLocaleUpperCase()}
      </Tag>
    ))
  }, [detailItem?.status])
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
          <TitleContentRow label="Trạng thái đơn" content={renderStatusOrder} />
          <TitleContentRow label="Hình thức thanh toán" content={'Banking'} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <TitleContentRow label="Tên người mua" content={detailItem?.code} />
          <TitleContentRow label="Địa chỉ đặt hàng" content={'Tan Binh, HCM city'} />
        </div>

        <div className="mt-3 text-lg font-bold ">Sản phẩm đã đặt:</div>
        <>
          <ProductListOrder productList={detailItem?.products} />
        </>
        <TitleContentRow
          label="Tổng tiền"
          content={<span className="text-green-500 font-bold">{parseNumber(detailItem?.total, 'VND')}</span>}
          className="text-lg my-4"
        />
      </div>
    </Modal>
  )
}

function ProductListOrder({ productList }: { productList: IOrderProduct | any }) {
  const columns: TableColumnsType<IOrderProduct> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
      render: (_, { product }) => (
        <>
          <div className="flex flex-row items-center gap-2">
            <Image src={product?.thumbnail} alt="Image product order" width={50} height={50} />
            <span>{product?.title}</span>
          </div>
        </>
      ),
      width: 300,
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price',
      render: (_, { product }) => (
        <>
          <div className="">{parseNumber(product?.price, 'VND')}</div>
        </>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
    },
  ]
  return <Table columns={columns} dataSource={productList} pagination={false} className="border" />
}
