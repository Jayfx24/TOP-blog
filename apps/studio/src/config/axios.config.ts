import axios from "axios";

export const api = axios.create({
  baseURL: "/",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

// if 401 error fetch rf and call refresh to get new token
/**
 * Queue failed request and retry upon issuance  of  new token
 */
// else return 401

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const rf = localStorage.getItem("refresh_token");
   

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post("/auth/refresh", rf);
        const newToken = data.token;

        localStorage.setItem("access_token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(originalRequest);
      } catch (rfError) {
        console.error(rfError);
        processQueue(rfError as Error, null);
        localStorage.removeItem("access_token");
        return Promise.reject(rfError);
      } finally {
        isRefreshing = false;
      }
    }
  },
);

export default api;
