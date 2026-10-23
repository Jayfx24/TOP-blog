
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
import { useEditor, type Content } from "@tiptap/react";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import StudioService from "@/StudioService";
import {  useBlocker, useNavigate } from "react-router";
import { ZCreate } from "@/schemas/post-schema";
import { useCallback, useState } from "react";
import { Model } from "@/components/Model/model";

// TODO: UPDATE LOGIC
type IEditor = {
  // post : PostResponsePayload,
  content: Content;
};

export function EditorForm({ content }: IEditor) {
  const [isDirty, setIsDirty] = useState(false);
  const blocker = useBlocker(useCallback(() => isDirty, [isDirty]));
  //  check if context matches editor current
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
    onUpdate({ editor }) {
      setIsDirty(editor.getHTML() !== content);
    },
  });

  const navigate = useNavigate();

  if (!editor) return;
 
  // const onAction = () => {};
  // const handleUpdate = () => {};

  const handlePublish = async (published: boolean = false) => {
    const $firstHeading = editor.$node("heading", { level: 1 });
    const title = $firstHeading?.textContent;

    const result = ZCreate.safeParse({
      title,
      content: editor.getHTML(),
      published,
    });

    console.log($firstHeading?.textContent);
    console.log(editor.getJSON());
    console.log("Publishing:", published);

    if (!result.success) {
      const errMap = result.error;
      // setFormError(z.flattenError(result.error));
      return console.error(errMap.issues);
    }
    // api.post("cr")

    const data = await StudioService.createPost(result.data);

    // navigate(`api/${data.id}`);
    navigate(`/posts`);
    console.log(result);
    console.log(data);

    // call the db and send
  };

  return (
    <>
    <div className={styles.base}>
      <SimpleEditor editor={editor} handlePublish={handlePublish} />
      {blocker.state === "blocked" && (
        <Model
          title="Wait! You didn't save your post yet"
          description="Proceed to discard or cancel to continue"
          onCancelText="cancel"
          onActionText="proceed"
          onCancel={() => blocker.reset()}
          onAction={() => blocker.proceed()}
          open
        />
      )}
    </div>
    </>
  );
}
