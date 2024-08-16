import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IOrderDebit } from "@/types/order-debit";
import queryString from "query-string";

const path = "/debit-order";

const getDebitOrdersAdmin = async (params: IQueryParams): Promise<CustomAxiosResponse<IOrderDebit[]>> => {
    const queryParams = {
        ...(params.search && { search: params.search }),
        page: params.page,
        pageSize: params.pageSize,
    };
    const q = queryString.stringify(queryParams);
    const url = `${path}?${q}`;
    const response = await axiosClient.get<CustomAxiosResponse<IOrderDebit[]>>(
        url
    );
    return response.data;
};
const paymentDebitOrder = async (payloads: { paymentAmount: number, orderId: string }) => {
    const response = await axiosClient.post<CustomAxiosResponse<{ paymentAmount: number, orderId: string }>>(
        `${path}/payment-debit`,
        payloads
    );
    return response.data;
};


export { getDebitOrdersAdmin, paymentDebitOrder }