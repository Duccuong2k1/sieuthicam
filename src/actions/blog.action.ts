import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { IBlog } from "@/types/blog";
import { ICoupon } from "@/types/coupon";
import queryString from "query-string";



const path = "/blog";

const getBlogs = async (params: IQueryParams) => {
    const queryParams = {
        ...(params.search && { search: params.search }),
        page: params.page,
        pageSize: params.pageSize,
    };
    const q = queryString.stringify(queryParams);
    const url = `${path}?${q}`;
    const response = await axiosClient.get<CustomAxiosResponse<IBlog[]>>(
        url
    );
    return response.data;
};

const createBlog = async (value: IBlog) => {
    const response = await axiosClient.post<CustomAxiosResponse<IBlog>>(
        `${path}/create`,
        value
    );
    return response.data;
};

const updateBlog = async (id: string, value: IBlog) => {
    const response = await axiosClient.put<CustomAxiosResponse<IBlog>>(
        `${path}/update/${id}`,
        value
    );
    return response.data;
};

const deleteBlog = async (id: string) => {
    const response = await axiosClient.delete<CustomAxiosResponse<IBlog>>(
        `${path}/delete/${id}`
    );
    return response.data;
};


export { getBlogs, createBlog, updateBlog, deleteBlog };
