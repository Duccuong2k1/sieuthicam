
import { getProducts } from "@/actions/product.action";
import { IProduct } from "@/types/product";
import { useEffect, useState, useCallback } from "react";

export const useGetProducts = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productData, setProductData] = useState<IProduct[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null); // Reset error before fetching data
        try {
            const res = await getProducts({ page: 1, pageSize: 1000 });
            if (res && res.success) {
                setProductData(res.data);
            } else {
                setError("Failed to fetch products");
            }
        } catch (err) {
            setError("Error fetching product list");
            console.error("Error fetching product list:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            fetchProducts();
        }
    }, [isMounted, fetchProducts]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return {
        productData,
        isLoading,
        error,
        refreshProducts: fetchProducts, // Provide a way to refresh the categories
    };
};
