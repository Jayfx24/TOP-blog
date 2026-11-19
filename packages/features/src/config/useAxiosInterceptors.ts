import { useEffect } from "react";
import { api as axiosInstance } from "./axios.config.js";
import { useNavigate } from "react-router";
import axios, { isAxiosError } from "axios";

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

const processQueue = (error: Error | null, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
let failedQueue: FailedRequest[] = [];
let isRefreshing = false;

export const useAxiosInterceptors = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config;
      },
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const { data } = await axios.post(
              `${axiosInstance.defaults.baseURL}/auth/refresh`,
              {},
              { withCredentials: true },
            );
            const newToken = data.token;

            localStorage.setItem("access_token", newToken);
            axiosInstance.defaults.headers.common["Authorization"] =
              `Bearer ${newToken}`;

            processQueue(null, newToken);
            return axiosInstance(originalRequest);
          } catch (rfError) {
            console.error(rfError);
            processQueue(rfError as Error, null);
            localStorage.removeItem("access_token");

            navigate("/login", { replace: true });

            return Promise.reject(rfError);
          } finally {
            isRefreshing = false;
          }
        }

        // if (isAxiosError(error)) {
        //   if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        //     console.error("API request timed out:", error.config?.url);
        //   }
        // }
        // return Promise.reject(error);
      },
    );

    // Return cleanup function to remove interceptors if necessary
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};
