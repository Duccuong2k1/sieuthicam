import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IImportHistoryInventory } from "@/types/import-history";

import queryString from "query-string";



const path = "/import-history";

const getImportHistoryInventories = async (params: IQueryParams) => {
    const queryParams = {
        ...(params.search && { search: params.search }),
        page: params.page,
        pageSize: params.pageSize,
    };
    const q = queryString.stringify(queryParams);
    const url = `${path}?${q}`;
    const response = await axiosClient.get<CustomAxiosResponse<IImportHistoryInventory[]>>(
        url
    );
    return response.data;
};
const deleteOrderInventoryHistory = async (id: string) => {
    const response = await axiosClient.delete<CustomAxiosResponse<IImportHistoryInventory>>(
        `${path}/${id}`
    );
    return response.data;
};


export { getImportHistoryInventories, deleteOrderInventoryHistory };
