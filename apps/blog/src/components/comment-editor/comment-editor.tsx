import { Input } from "@blog/ui";
import Editor from "../tiptap/tiptap";
import styles from "./comment-editor.module.css";
import { EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo, useState, type SubmitEvent } from "react";
import { ZCommentInput, type TComment } from "@blog/lib";
import z from "zod";
import { fromError, createErrorMap } from 'zod-validation-error';


interface CommentProps {
  postId: TComment["id"];
}
export function CommentEditor({ postId }: CommentProps) {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });
  const [error, setError] = useState<z.core.$ZodIssue[] | null>()
  const providerValue = useMemo(() => {
    return { editor };
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate input
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      content: editor.getHTML(),
      postId,
    };
    console.log("dirty data:", data);
    const result = ZCommentInput.safeParse(data);
    console.log(result)
    if (!result.success) {
      const validationError = fromError(result.error);
 
  console.log(validationError.toString());
      // setError(result.error.issues)
      return console.error(result.error.message); //show throw error and handle it graciously
    }


    setError(null)
    const cleanData = result.data;
    console.log("clean data:", cleanData);
    // send to server
  };
  return (
    <EditorContext.Provider value={providerValue}>
      <form action="" className={styles.base} onSubmit={handleSubmit}>
        {" "}
        <div className="">
          <label htmlFor="name">Enter Desired Username</label>
          <Input type="text" name="name" id="name" required/>
        </div>
        <div className="form-group">
          <Editor />
        </div>
      </form>
    </EditorContext.Provider>
  );
}
