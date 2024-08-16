import { BaseProps } from "./base";
import { IOrder } from "./order";

export interface IOrderDebit extends BaseProps {
    status: string,

    orderId: IOrder
    totalAmountOutStanding: number
    totalAmountPaid: number

}


export const PAYMENT_STATUS_ORDER = [
    {
        label: "Đã thanh toán",
        value: "paid",

    },
    {
        label: "Chưa thanh toán",
        value: "unpaid",

    },


]