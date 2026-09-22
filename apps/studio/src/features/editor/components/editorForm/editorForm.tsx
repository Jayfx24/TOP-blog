
import { Input } from "../input/input";
import { useState } from "react";
import { z } from "zod";
import { PostCreatePayload, type PostCreatePayloadT } from "@blog/lib";
import content from "@/components/tiptap-templates/simple/data/content.json";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
// interface IEditorForm {
//   e: React.MouseEvent<HTMLFormElement>;
//   content: Content;
//   publish: boolean;
// }

export function EditorForm() {
  const [formError, setFormError] =
    useState<z.core.$ZodFlattenedError<PostCreatePayloadT> | null>(null);
  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>,
    // content: Content,
  ) => {
    e.preventDefault();
    const target = e.currentTarget;
    if (!target) return;
    const handler = e.nativeEvent.submitter as HTMLButtonElement;
    const formData = new FormData(target);

    const title = formData.get("title");
    const content = formData.get("content");
    const published = handler?.value.trim() === "publish";

    const result = PostCreatePayload.safeParse({ title, content, published });

    if (!result.success) {
      const errMap = result.error;
      setFormError(z.flattenError(result.error));
      return console.error(errMap.issues);
    }

    console.log("is publishing", published);
    console.log(typeof content, content);
    console.log(title, handler?.value);
    console.log("submit..ing");
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title?</label>
        <Input placeholder="Title" id="title" name="title" />
        {formError?.fieldErrors.title && (
          <span className="">{formError?.fieldErrors.title}</span>
        )}
      </div>

      <SimpleEditor content={content} />
    </form>
  );
}
