import { useAxiosInterceptors } from "./useAxiosInterceptors.js";

export  function AxiosInterceptorProvider() {
  useAxiosInterceptors();
  return null;
}
