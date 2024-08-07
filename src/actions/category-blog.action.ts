import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse, IQueryParams } from "@/types/base";
import { ICategoryBlog } from "@/types/blog";

import queryString from "query-string";



const path = "/blog-category";

const getCategoryBlogs = async (params: IQueryParams) => {
    const queryParams = {
        ...(params.search && { search: params.search }),
        page: params.page,
        pageSize: params.pageSize,
    };
    const q = queryString.stringify(queryParams);
    const url = `${path}?${q}`;
    const response = await axiosClient.get<CustomAxiosResponse<ICategoryBlog[]>>(
        url
    );
    return response.data;
};

const createCategoryBlog = async (value: ICategoryBlog) => {
    const response = await axiosClient.post<CustomAxiosResponse<ICategoryBlog>>(
        `${path}/create`,
        value
    );
    return response.data;
};

const updateCategoryBlog = async (id: string, value: ICategoryBlog) => {
    const response = await axiosClient.put<CustomAxiosResponse<ICategoryBlog>>(
        `${path}/${id}`,
        value
    );
    return response.data;
};

const deleteCategoryBlog = async (id: string) => {
    const response = await axiosClient.delete<CustomAxiosResponse<ICategoryBlog>>(
        `${path}/${id}`
    );
    return response.data;
};


export { getCategoryBlogs, createCategoryBlog, updateCategoryBlog, deleteCategoryBlog };
