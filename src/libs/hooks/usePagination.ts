import { IQueryParams } from "@/types/base";
import { useState, useEffect } from "react";


export interface PaginationResponse<T> {
  data: T[];
  total: number;
}

export function usePagination<T>(
  fetchFunction: (params: IQueryParams) => Promise<PaginationResponse<T>>,
  initialParams: IQueryParams
) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState(initialParams);

  const fetchData = async (newParams?: IQueryParams) => {
    setIsLoading(true);
    try {
      const response = await fetchFunction(newParams || params);
      setData(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params);
  }, [params]);

  return { data, total, isLoading, fetchData, setParams, params, setIsLoading };
}
