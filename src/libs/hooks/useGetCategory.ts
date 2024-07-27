import { getAllCategories, getCategories } from "@/actions/category.action";
import { ICategory } from "@/types/category";
import { useEffect, useState, useCallback } from "react";

export const useGetCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Reset error before fetching data
    try {
      const res = await getAllCategories();
      if (res && res.success) {
        setCategoryData(res.data);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError("Error fetching category list");
      console.error("Error fetching category list:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchCategories();
    }
  }, [isMounted, fetchCategories]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    categoryData,
    isLoading,
    error,
    refreshCategories: fetchCategories, // Provide a way to refresh the categories
  };
};
