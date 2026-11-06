// import { useState } from "react";
// import "./App.css";
import { AuthProvider, AxiosInterceptorProvider } from "@blog/features";

import { Outlet } from "react-router";

function App() {


  return (
    <div className="">
      <AuthProvider>
        <AxiosInterceptorProvider />
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
