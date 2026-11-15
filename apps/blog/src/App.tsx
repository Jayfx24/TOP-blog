// import { useState } from "react";
import "./App.css";
import {  AxiosInterceptorProvider } from "@blog/features";

import { Outlet } from "react-router";

function App() {


  return (
    <div className="">
      
        <AxiosInterceptorProvider />
        <Outlet />
      
    </div>
  );
}

export default App;
