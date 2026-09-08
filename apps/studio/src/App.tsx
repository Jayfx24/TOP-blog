// import { useState } from 'react'
import Layout from "./components/Layout/layout";
import "./App.css";
import { Button } from "@blog/ui";
import { Editor } from "@/features/editor/components/editor";




function App() {
  return (
    <Layout>
      <div className=""><Button variant={"destruction"}>This is a test</Button></div>
      <Editor/>
    </Layout>
  );
}

export default App;
