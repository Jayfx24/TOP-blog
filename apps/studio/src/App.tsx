import "./App.css";
import { Outlet } from "react-router";
import { AuthProvider, AxiosInterceptorProvider } from "@blog/features";

function App() {
  return (
    <AuthProvider>
      <AxiosInterceptorProvider />
      <Outlet />;
    </AuthProvider>
  );
}

export default App;
