import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IProduct } from "@/types/product";
import queryString from "query-string";



const path = "/product";

const getProducts = async (params: IQueryParams) => {

  const queryParams = {
    ...(params.search && { search: params.search }), // Chỉ thêm `search` nếu nó tồn tại
    page: params.page,
    limit: params.pageSize,
  };
  const q = queryString.stringify(queryParams);
  const url = `${path}?${q}`;
  const response = await axiosClient.get<CustomAxiosResponse<IProduct[]>>(url);
  return response.data;
};
const createProduct = async (value: FormData) => {
  const response = await axiosClient.post<CustomAxiosResponse<IProduct>>(
    `${path}/create`,
    value,

  );
  return response.data;
};


// const updateProduct = async (id: string, value: FormData) => {
// const response = await axiosClient.put<CustomAxiosResponse<IProduct>>(
// `${path}/${id}`,
// value,
// {
// headers: {
// 'Content-Type': 'multipart/form-data',
// },
// }
// );
// return response.data;
// };
// 
const updateProduct = async (id: string, value: FormData) => {
  const response = await axiosClient.put<CustomAxiosResponse<IProduct>>(
    `${path}/${id}`,
    value,
  );
  return response.data;
};


const deleteProduct = async (id: string) => {
  const response = await axiosClient.delete<CustomAxiosResponse<IProduct>>(
    `${path}/${id}`
  );
  return response.data;
};



export { getProducts, createProduct, updateProduct, deleteProduct };
