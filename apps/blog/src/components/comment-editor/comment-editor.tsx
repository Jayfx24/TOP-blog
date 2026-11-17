import { Input } from "@blog/ui";
import Editor from "../tiptap/tiptap";
import styles from "./comment-editor.module.css";
import { EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo, useState, type SubmitEvent } from "react";
import { ZCommentInput, type TComment } from "@blog/lib";
import { ZodError } from "zod";
import { blogService } from "@/blogService";
import { useRevalidator } from "react-router";
import { Placeholder } from "@tiptap/extensions";

interface CommentProps {
  postId: TComment["id"];
}
export function CommentEditor({ postId }: CommentProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ], // define your extension array
    // content: "<p>Hello World!</p>", // initial content
  });
  const [error, setError] = useState<ZodError | null>();
  const [username, setUsername] = useState("");
  // const [userComment, setUserComment] = useState('');
  const revalidator = useRevalidator();

  const providerValue = useMemo(() => {
    return { editor };
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate input
    // const formData = new FormData(e.currentTarget);

    const data = {
      name: username,
      content: editor.getText(),
      postId,
    };

    const result = ZCommentInput.safeParse(data);

    if (!result.success) {
      // setError(result.error.issues)
      return setError(result.error); //show throw error and handle it graciously
    }

    setError(null);
    const cleanData = result.data;

    // send to server

    const comment = await blogService.postComment(cleanData);

    if (comment) {
      // revalidate to reload loaders and clear form fields
      revalidator.revalidate();

      editor.chain().focus().clearContent().run();
      setUsername("");
    }
  };
  return (
    <EditorContext.Provider value={providerValue}>
      <form action="" className={styles.base} onSubmit={handleSubmit}>
        {" "}
        <ul className="errors">
          {error?.issues?.map((issue) => (
            <li className="error-item">{issue.message?.toUpperCase()}</li>
          ))}
          <span></span>
        </ul>
        <div className="">
          <label htmlFor="name">Enter Desired Username</label>
          <Input
            type="text"
            name="name"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="min 3 characters"
            required
          />
        </div>
        <div className="form-group">
          <Editor />
        </div>
      </form>
    </EditorContext.Provider>
  );
}
