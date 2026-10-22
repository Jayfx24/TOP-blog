// import { useState } from 'react'

import "./App.css";
import { Outlet } from "react-router";
import AuthProvider from "./features/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Outlet />;
    </AuthProvider>
  );
}

export default App;
