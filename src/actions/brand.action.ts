import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IBrand } from "@/types/category";
import queryString from "query-string";

const path = "/brand";

const getBrands = async (params: IQueryParams) => {
  const queryParams = {
    ...(params.search && { search: params.search }),
    page: params.page,
    pageSize: params.pageSize,
  };
  const q = queryString.stringify(queryParams);
  const url = `${path}?${q}`;
  const response = await axiosClient.get<CustomAxiosResponse<IBrand[]>>(
    url
  );
  return response.data;
};

const createBrand = async (value: IBrand) => {
  const response = await axiosClient.post<CustomAxiosResponse<IBrand>>(
    `${path}/create`,
    value
  );
  return response.data;
};

const updateBrand = async (id: string, value: IBrand) => {
  const response = await axiosClient.put<CustomAxiosResponse<IBrand>>(
    `${path}/${id}`,
    value
  );
  return response.data;
};

const deleteBrand = async (id: string) => {
  const response = await axiosClient.delete<CustomAxiosResponse<IBrand>>(
    `${path}/${id}`
  );
  return response.data;
};

export { getBrands, createBrand, updateBrand, deleteBrand };
