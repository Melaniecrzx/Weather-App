import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!url) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('API_ERROR');
            }
            const data = await response.json();
            setData(data);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);



    return { data, loading, error, refetch: fetchData };
}