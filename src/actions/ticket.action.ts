import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";

import { ITicket } from "@/types/ticket";

const path = "/ticket";

const getTickets = async (params: IQueryParams) => {
  const response = await axiosClient.get<CustomAxiosResponse<ITicket[]>>(
    `${path}?page=${params.page}&pageSize=${params.pageSize}`
  );
  return response.data;
};

const createTicket = async (value: ITicket) => {
  const response = await axiosClient.post<CustomAxiosResponse<ITicket>>(
    `${path}/create`,
    value
  );
  return response.data;
};

const updateTicket = async (id: string, value: ITicket) => {
  const response = await axiosClient.put<CustomAxiosResponse<ITicket>>(
    `${path}/${id}`,
    value
  );
  return response.data;
};

const deleteTicket = async (id: string) => {
  const response = await axiosClient.delete<CustomAxiosResponse<ITicket>>(
    `${path}/${id}`
  );
  return response.data;
};

const answerRequestTicket = async (id: string, value: ITicket) => {
  const response = await axiosClient.put<CustomAxiosResponse<ITicket>>(
    `${path}/answer/${id}`,
    value
  );
  return response.data;
}

export { getTickets, createTicket, updateTicket, deleteTicket, answerRequestTicket };
