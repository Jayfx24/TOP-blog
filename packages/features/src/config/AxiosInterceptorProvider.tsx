import { useAxiosInterceptors } from "./useAxiosInterceptors";

export  function AxiosInterceptorProvider() {
  useAxiosInterceptors();
  return null;
}
