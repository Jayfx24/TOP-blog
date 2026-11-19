// import "./App.css";
import { Outlet } from "react-router";
import {
  AuthProvider,
  AxiosInterceptorProvider,
  configureAPI,
} from "@blog/features";

function App() {
  configureAPI(import.meta.env.VITE_API_URL);
  return (
    <AuthProvider>
      <AxiosInterceptorProvider />
      <Outlet />;
    </AuthProvider>
  );
}

export default App;
