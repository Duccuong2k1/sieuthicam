import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IBlog } from "@/types/blog";
import { ICoupon } from "@/types/coupon";
import { IInventory, IItemsImport } from "@/types/inventory";
import queryString from "query-string";



const path = "/inventory";

const getInventories = async (params: IQueryParams) => {
    const queryParams = {
        ...(params.search && { search: params.search }),
        page: params.page,
        pageSize: params.pageSize,
    };
    const q = queryString.stringify(queryParams);
    const url = `${path}?${q}`;
    const response = await axiosClient.get<CustomAxiosResponse<IInventory[]>>(
        url
    );
    return response.data;
};

const createInventory = async (items: IItemsImport[]) => {
    const response = await axiosClient.post<CustomAxiosResponse<IInventory>>(
        `${path}/create`,
        { items: items }
    );
    return response.data;
};

const deleteOrderInventory = async (id: string) => {
    const response = await axiosClient.delete<CustomAxiosResponse<IInventory>>(
        `${path}/${id}`
    );
    return response.data;
};

export { getInventories, createInventory, deleteOrderInventory };
