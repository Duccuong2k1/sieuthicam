import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IOrder } from "@/types/order";
import queryString from "query-string";

const path = "/order";

const getOrdersByAdmin = async (params: IQueryParams) => {
  const queryParams = {
    ...(params.search && { search: params.search }), // Chỉ thêm `search` nếu nó tồn tại
    page: params.page,
    pageSize: params.pageSize,
  };
  const q = queryString.stringify(queryParams);
  const url = `${path}/admin?${q}`;
  const response = await axiosClient.get<CustomAxiosResponse<IOrder[]>>(url);
  return response.data;
};

const deleteOrder = async (id: string) => {
  const response = await axiosClient.delete<CustomAxiosResponse<IOrder>>(
    `${path}/${id}`
  );
  return response.data;
};

const updateStatusOrder = async (id: string, value: string) => {
  const response = await axiosClient.put<CustomAxiosResponse<IOrder>>(
    `${path}/update-status/${id}`,
    {
      status: value,
    }
  );
  return response.data;
};



export { getOrdersByAdmin, deleteOrder, updateStatusOrder }