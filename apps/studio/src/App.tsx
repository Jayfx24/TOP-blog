// import { useState } from 'react'
import Layout from "./components/Layout/layout";
import "./App.css";

import { SideBar } from "./features/side-bar/sideBar";
// import { EditorPage } from "./features/editor/editor-page";
import { PostsPage } from "./features/post/page/posts-page";

function App() {
  return (
    <Layout>
      <SideBar avatar="https://placehold.co/600x400" fullName="Jay Nicely" />
      {/* <Editor/> */}
      {/* <EditorPage /> */}
      <div className="container">
        <PostsPage />
      </div>
    </Layout>
  );
}

export default App;
