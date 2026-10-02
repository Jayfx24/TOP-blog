// import { useState } from 'react'
import Layout from "./components/Layout/layout";
import "./App.css";

import { SideBar } from "./features/side-bar/sideBar";
import { EditorPage } from "./features/editor/editorPage";



function App() {
  return (
    <Layout>
      <SideBar avatar="https://placehold.co/600x400" fullName="Jay Nicely" />
      {/* <Editor/> */}
      <EditorPage />
    </Layout>
  );
}

export default App;
