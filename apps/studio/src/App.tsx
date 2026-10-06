// import { useState } from 'react'
import Layout from "./components/Layout/layout";
import "./App.css";
import { Outlet } from "react-router";

import { SideBar } from "./features/side-bar/sideBar";


function App() {
  return (
    <Layout>
      <SideBar avatar="https://placehold.co/600x400" fullName="Jay Nicely" />
     <Outlet />
    </Layout>
  );
}

export default App;
