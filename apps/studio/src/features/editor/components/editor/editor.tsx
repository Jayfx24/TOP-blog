// import { Input } from "../input/input";
// import { useState } from "react";
// import { z } from "zod";
// import { Field } from "@/components/Field/field";
// import { Info } from "lucide-react";
import { ZPostCreatePayload } from "@blog/lib";
import content from "@/components/tiptap-templates/simple/data/content.json";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import styles from "./editor.module.css";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { FindAndReplace } from "@tiptap/extension-find-and-replace";
import { Selection } from "@tiptap/extensions";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { useEditor } from "@tiptap/react";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import EditorService from "../../EditorService";
import { redirect } from "react-router";
// import { api } from "@/config/axios.config";

// TODO: UPDATE LOGIC

export function EditorForm() {
  // const [formError, setFormError] =
  //   useState<z.core.$ZodFlattenedError<ZPostCreatePayloadT> | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      Image.configure({}),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Superscript,
      Subscript,
      Selection,
      FindAndReplace.configure({
        searchDebounceMs: 500,
        injectCSS: false,
      }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content,
  });

  if (!editor) return;
  //  const handleSubmit = (
  //   e: React.SubmitEvent<HTMLFormElement>,
  //   // content: Content,
  // ) => {
  //   e.preventDefault();
  //   const target = e.currentTarget;
  //   if (!target) return;
  //   const handler = e.nativeEvent.submitter as HTMLButtonElement;
  //   const formData = new FormData(target);

  //   const title = formData.get("title");
  //   const content = formData.get("content");
  //   const published = handler?.value.trim() === "publish";

  //   const result = ZPostCreatePayload.safeParse({ title, content, published });

  //   if (!result.success) {
  //     const errMap = result.error;
  //     setFormError(z.flattenError(result.error));
  //     return console.error(errMap.issues);
  //   }

  //   console.log("is publishing", published);
  //   console.log(typeof content, content);
  //   console.log(title, handler?.value);
  //   console.log("submit..ing");
  //   setFormError(null);
  // };

  // const content: Content =

  const handleCreate = ()=> {}
  const handleUpdate = ()=> {}

  const handlePublish = async(published: boolean = false) => {
    const $firstHeading = editor.$node("heading", { level: 1 });
    const title = $firstHeading?.textContent;

    const result = ZPostCreatePayload.safeParse({ title, content: editor.getJSON(), published});

    console.log($firstHeading?.textContent);
    console.log(editor.getJSON());
    console.log("Publishing:", published);

    if (!result.success) {
      const errMap = result.error;
      // setFormError(z.flattenError(result.error));
      return console.error(errMap.issues);
    }
    // api.post("cr")

    const data = await EditorService.createPost(result.data)

    redirect(`/${data.id}`)
    console.log(result)

    // call the db and send
  };

  return (
    <div className={styles.base}>
      <SimpleEditor editor={editor} handlePublish={handlePublish} />
    </div>
  );
}
