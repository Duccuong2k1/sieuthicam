import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import queryString from "query-string";

const path = "/statistic";

const getStatisticList = async (params: any): Promise<CustomAxiosResponse<any[]>> => {
    const queryParams = {
        ...(params.filter && { filter: params.filter }), // Chỉ thêm `search` nếu nó tồn tại
    };

    const q = queryString.stringify(queryParams);
    const url = `${path}?${q}`;

    const response = await axiosClient.get<CustomAxiosResponse<any[]>>(url);
    return response.data;
};

export { getStatisticList }