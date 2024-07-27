import axiosClient from "@/libs/helpers/axios-client"
import { CustomAxiosResponse } from "@/types/base";
import { IUser } from "@/types/user";

const path = "/auth";

const loginAccount = async (email: string, password: string) => {
  const response = await axiosClient.post<CustomAxiosResponse<IUser>>(`${path}/login`, {
    email,
    password,
  });
  return response.data;
};

const registerAccount = async (value: IUser) => {
  const response = await axiosClient.post<CustomAxiosResponse<IUser>>(`${path}/register`, value);
  return response.data;
};


const refetchAccessToken = async () => {
  const response = await axiosClient.get<CustomAxiosResponse<any>>(`${path}/refetch-token`);
  return response.data;
};

export { loginAccount, registerAccount, refetchAccessToken }