import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IUser } from "@/types/user";
import queryString from 'query-string';

const path = "/user";

const getUserList = async (params: IQueryParams): Promise<CustomAxiosResponse<IUser[]>> => {
  const queryParams = {
    ...(params.search && { search: params.search }), // Chỉ thêm `search` nếu nó tồn tại
    page: params.page,
    pageSize: params.pageSize,
  };

  const q = queryString.stringify(queryParams);
  const url = `${path}?${q}`;

  const response = await axiosClient.get<CustomAxiosResponse<IUser[]>>(url);
  return response.data;
};

const getUserCurrent = async () => {
  const response = await axiosClient.get<CustomAxiosResponse<IUser>>(
    `${path}/current`
  );
  return response.data;
};

const updateUserByAdmin = async (id: string, value: IUser) => {
  const response = await axiosClient.put<CustomAxiosResponse<IUser>>(
    `${path}/update-by-admin/${id}`,
    value
  );
  return response.data;
};


const changeInfoAccount = async (value: IUser) => {
  const response = await axiosClient.put<CustomAxiosResponse<IUser>>(`${path}/update-account`, value);
  return response.data;
};


const deleteUser = async (id: string) => {
  const response = await axiosClient.delete<CustomAxiosResponse<IUser>>(
    `${path}/delete?id=${id}`
  );
  return response.data;
};
export { getUserList, getUserCurrent, updateUserByAdmin, deleteUser, changeInfoAccount };
