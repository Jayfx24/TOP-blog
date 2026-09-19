// import { useState } from 'react'
import Layout from "./components/Layout/layout";
import "./App.css";
import { Button } from "@blog/ui";
import { Editor } from "@/features/editor/editor";
import { SideBar } from "./features/side-bar/sideBar";



function App() {
  return (
    <Layout>
      <SideBar avatar="https://placehold.co/600x400" fullName="Jay Nicely" />
      <Editor/>
    </Layout>
  );
}

export default App;
