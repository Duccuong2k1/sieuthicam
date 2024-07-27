import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { ICategory } from "@/types/category";
import queryString from "query-string";

const path = "/categories";

const getCategories = async (params: IQueryParams) => {
  const queryParams = {
    ...(params.search && { search: params.search }),
    page: params.page,
    pageSize: params.pageSize,
  };
  const q = queryString.stringify(queryParams);
  const url = `${path}?${q}`;
  const response = await axiosClient.get<CustomAxiosResponse<ICategory[]>>(
    url
  );
  return response.data;
};
const getAllCategories = async () => {
  const response = await axiosClient.get<CustomAxiosResponse<ICategory[]>>(
    `${path}/all`
  );
  return response.data;
};


const createCategory = async (value: ICategory) => {
  const response = await axiosClient.post<CustomAxiosResponse<ICategory>>(
    `${path}/create`,
    value
  );
  return response.data;
};

const updateCategory = async (id: string, value: ICategory) => {
  const response = await axiosClient.put<CustomAxiosResponse<ICategory>>(
    `${path}/${id}`,
    value
  );
  return response.data;
};

const deleteCategory = async (id: string) => {
  const response = await axiosClient.delete<CustomAxiosResponse<ICategory>>(
    `${path}/${id}`
  );
  return response.data;
};

export { getCategories, updateCategory, deleteCategory, createCategory, getAllCategories };
