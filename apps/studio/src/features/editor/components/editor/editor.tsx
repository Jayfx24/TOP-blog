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
import { useBlocker, useNavigate } from "react-router";
import { ZCreate, type TCreate } from "@/schemas/post-schema";
import { useCallback, useRef, useState } from "react";
import { Model } from "@/components/Model/model";
import { CircleAlert } from "lucide-react";
import { ZPostUpdatePayload, type PostUpdatePayload } from "@blog/lib";
import { useEditorX } from "./editor-context";

// BUG: blocker still causes pop up upon action resolving
type IEditor = {
  // post : PostResponsePayload,
  content: Content;

  id?: PostUpdatePayload["id"];
};

export function EditorForm({ content, id }: IEditor) {
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isUpdate } = useEditorX();

  const blocker = useBlocker(
    useCallback(() => isDirty && !isSubmitted, [isDirty, isSubmitted]),
  );

  const savedContentRef = useRef(content);

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
      const dirty = editor.getHTML() !== savedContentRef.current;
      setIsDirty(dirty);
    },
  });

  const navigate = useNavigate();

  if (!editor) return;

  // const onAction = () => {};
  // const handleUpdate = async (published: boolean = false) => {
  //   const $firstHeading = editor.$node("heading", { level: 1 });
  //   const title = $firstHeading?.textContent;

  //   if (!title) {
  //     // TODO: toast notifying user title is needed
  //     return;
  //   }

  //   const result = ZPostUpdatePayload.safeParse({
  //     id,
  //     title,
  //     content: editor.getHTML(),
  //     published,
  //   });

  //   if (!result.success) {
  //     const errMap = result.error;
  //     // setFormError(z.flattenError(result.error));
  //     return console.error(errMap.issues);
  //   }

  //   const data = await StudioService.updatePost(result.data);
  //   navigate(`/posts`);
  //   console.log(result);
  //   console.log(data);
  // };

  const handlePublish = async (published: boolean = false) => {
    const $firstHeading = editor.$node("heading", { level: 1 });
    const title = $firstHeading?.textContent.trim();

    if (!title) {
      // TODO: toast notifying user title is needed
      return;
    }
    let result;

    if (isUpdate) {
      result = ZPostUpdatePayload.safeParse({
        id,
        title,
        content: editor.getHTML(),
        published,
      });
    } else {
      result = ZCreate.safeParse({
        title,
        content: editor.getHTML(),
        published,
      });
    }

   

    if (!result.success) {
      const errMap = result.error;
      return console.error(errMap.issues);
    }
    

    const data = isUpdate
      ? await StudioService.updatePost(result.data as PostUpdatePayload)
      : await StudioService.createPost(result.data as TCreate);

    savedContentRef.current = editor.getHTML();

    setIsSubmitted(true);

    // Review: Works but do not understand why since isSubmitted is set to true and it fails without this
    navigate(`/posts`);
    if (blocker.state === "blocked") {
      blocker.proceed();
    }

    console.log(data);

    
  };

  console.log("block-state-2:", blocker);

  return (
    <>
      <div className={styles.base}>
        <SimpleEditor
          editor={editor}
          handlePublish={handlePublish}
          isDirty={isDirty}
        />
        {blocker.state === "blocked" && (
          <Model
            title="Wait! You didn't save your post yet"
            description="Proceed to discard or cancel to continue"
            onCancelText="cancel"
            onActionText="proceed"
            onCancel={() => blocker.reset()}
            onAction={() => blocker.proceed()}
            Icon={CircleAlert}
            open
          />
        )}
      </div>
    </>
  );
}
