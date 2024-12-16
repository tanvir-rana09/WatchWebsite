import { useState, useCallback, useRef } from "react";
import apiClient from "./apiClient";
import { toast } from "react-toastify";

function useApi(endpoint, method = "GET", config = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Use a ref to store the latest response data
    const responseDataRef = useRef(null);

    const callApi = useCallback(
        async (params = {}) => {
            setLoading(true);
            setError(null);

            try {
                const response = await apiClient.request({
                    url: endpoint,
                    method,
                    ...config,
                    ...(method === "GET" ? { params } : { data: params }),
                });

                const dat = await response.data;
                setData(dat);
                responseDataRef.current = response.data; // Update the ref with the latest data

                return response.data;
            } catch (err) {
                setError(err?.response);
                if (err?.status == 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    toast.error(
                        err?.response?.data?.error ||
                            "Your Token Expired please Login!"
                    );
                }
                console.error(`Error in API call to ${endpoint}:`, err);
            } finally {
                setLoading(false);
            }
        },
        [endpoint, method, config]
    );

    return { data, error, loading, callApi, responseDataRef };
}

export default useApi;
