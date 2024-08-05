import { BaseProps } from "./base";
import { IProduct } from "./product";

export interface IOrder extends BaseProps {
    status: string,
    orderBy: string,
    items: IOrderProduct[]
    code: string,
    totalCost: number | string,
    buyerName: string,
    buyerAddress: string,
    buyerPhone: string,
    paymentMethod: string,
    coupon: string,
}
export interface IOrderProduct {
    quantity: number,
    salePrice: number,
    _id: string;
    productId: IProduct
    weight?: number
    unit?: string
}


export interface IProductAddOrder {
    productId: string
    quantity: number
    salePrice: number
    weight?: number
    unit?: string
    productLabel?: string
}
export const PAYMENT_METHOD_ORDER = [
    {
        label: "Tiền mặt",
        value: "cost",

    },
    {
        label: "Chuyển khoản",
        value: "banking",

    },

]
export const STATUS_ORDER = [
    {
        label: "Chờ duyệt đơn",
        value: "Pending",
        color: "orange"
    },
    {
        label: "Đang  xử lý",
        value: "Processing",
        color: "lime"
    },
    {
        label: "Đang giao hàng",
        value: "Delivered",
        color: "green"
    },
    {
        label: "Đã giao hàng",
        value: "Shipped",
        color: "blue"
    },
    {
        label: "Hủy đơn",
        value: "Cancelled",
        color: "red"
    },
]