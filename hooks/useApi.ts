/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { useState, useCallback } from "react";
import apiClient from "@/lib/api/apiClient";

// Transform function type
type Transformer<T> = (data: any) => T;

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleResponse = <T>(
    response: AxiosResponse,
    transform?: Transformer<T>,
    failureMessage?: string,
  ): T => {
    const responseData = response.data;
    if (responseData.status?.toString() === "failed") {
      throw new Error(responseData.message || failureMessage || "Request failed");
    }
    return transform ? transform(responseData) : responseData;
  };

  const get = useCallback(
    async <T = any>(
      url: string,
      config: AxiosRequestConfig = {},
      transform?: Transformer<T>,
    ): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse = await apiClient.get(url, config);
        return handleResponse(response, transform, "Failed to fetch data");
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const post = useCallback(
    async <T = any>(
      url: string,
      data: any = {},
      config: AxiosRequestConfig = {},
      transform?: Transformer<T>,
    ): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const isFormData =
          typeof FormData !== "undefined" && data instanceof FormData;

        const headers = {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...(config.headers || {}),
        };

        const response: AxiosResponse = await apiClient.post(url, data, {
          ...config,
          headers,
        });
        return handleResponse(response, transform, "Request failed");
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const put = useCallback(
    async <T = any>(
      url: string,
      data: any = {},
      config: AxiosRequestConfig = {},
      transform?: Transformer<T>,
    ): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const isFormData =
          typeof FormData !== "undefined" && data instanceof FormData;

        const headers = {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...(config.headers || {}),
        };

        const response: AxiosResponse = await apiClient.put(url, data, {
          ...config,
          headers,
        });
        return handleResponse(response, transform, "Request failed");
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { get, post, put, loading, error };
};

export default useApi;
