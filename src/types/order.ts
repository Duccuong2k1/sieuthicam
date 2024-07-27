import { BaseProps } from "./base";
import { IProduct } from "./product";

export interface IOrder extends BaseProps {
    status: string,
    orderBy: string,
    total: number,
    products: IOrderProduct[]
    code: string,
}
export interface IOrderProduct {
    color: string;
    count: string;
    size: string;
    _id: string;
    product: IProduct
}
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