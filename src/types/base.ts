import { AxiosResponse } from "axios";

export interface BaseProps {
  _id: string;
  createdAt: string;
  updatedAt: string;
}


export interface CustomAxiosResponse<T> extends AxiosResponse {
  message?: string;
  data: T;
  success: boolean;
  accessToken?: string;
  refetchToken?: string;
  error?: string;
  total: number;
}


export interface IQueryParams {
  search?: string,
  page: number;
  pageSize?: number;
  limit?: number; // neu khong co thi mac dinh = pageSize
}