import { getInfoThemes } from "@/actions/theme.action";

import { IThemes } from "@/types/themes";
import { useEffect, useState, useCallback } from "react";

export const useGetThemes = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [themes, setThemes] = useState<IThemes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const fetchThemes = useCallback(async () => {
        setIsLoading(true);
        setError(null); // Reset error before fetching data
        try {
            const res = await getInfoThemes();
            if (res && res.success) {
                setThemes(res.data[0]);
            } else {
                setError("Failed to fetch themes");
            }
        } catch (err) {
            setError("Error fetching themes list");
            console.error("Error fetching themes list:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            fetchThemes();
        }
    }, [isMounted, fetchThemes]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return {
        themes,
        isLoading,
        error,
        refreshCategories: fetchThemes, // Provide a way to refresh the categories
    };
};
