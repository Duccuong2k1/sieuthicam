import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { ICoupon } from "@/types/coupon";
import queryString from "query-string";



const path = "/coupon";

const getCoupons = async (params: IQueryParams) => {
  const queryParams = {
    ...(params.search && { search: params.search }),
    page: params.page,
    pageSize: params.pageSize,
  };
  const q = queryString.stringify(queryParams);
  const url = `${path}?${q}`;
  const response = await axiosClient.get<CustomAxiosResponse<ICoupon[]>>(
    url
  );
  return response.data;
};

const createCoupon = async (value: ICoupon) => {
  const response = await axiosClient.post<CustomAxiosResponse<ICoupon>>(
    `${path}/create`,
    value
  );
  return response.data;
};

const updateCoupon = async (id: string, value: ICoupon) => {
  const response = await axiosClient.put<CustomAxiosResponse<ICoupon>>(
    `${path}/${id}`,
    value
  );
  return response.data;
};

const deleteCoupon = async (id: string) => {
  const response = await axiosClient.delete<CustomAxiosResponse<ICoupon>>(
    `${path}/${id}`
  );
  return response.data;
};


export { getCoupons, createCoupon, updateCoupon, deleteCoupon };
