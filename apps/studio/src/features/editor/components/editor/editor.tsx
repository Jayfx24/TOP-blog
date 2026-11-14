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
import { NodePos, useEditor, type Content } from "@tiptap/react";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";
import StudioService from "@/StudioService";
import { useBlocker, useNavigate } from "react-router";
import { ZCreate, type TCreate } from "@/schemas/post-schema";
import { useCallback, useRef, useState } from "react";
import { Model } from "@/components/Model/model";
import { CircleAlert } from "lucide-react";
import { ZPostUpdatePayload, type PostUpdatePayload } from "@blog/lib";
import { useEditorX } from "./editor-context";

import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import axios, { AxiosError } from "axios";
// BUG: blocker still causes pop up upon action resolving - partially solved
type IEditor = {
  // post : PostResponsePayload,
  content: Content;

  id?: PostUpdatePayload["id"];
};

const uploadToCloudinary = async (src: string, title: string) => {
  const { data: blob } = await axios.get(src, {
    responseType: "blob",
  });
  const formData = new FormData();
  formData.append("file", blob, title);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );
  formData.append("asset_folder", "blog");

  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData,
  );

  console.log(data);

  return data.secure_url;
};
export function EditorForm({ content, id }: IEditor) {
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [publish, setPublish] = useState(false);

  const { isUpdate } = useEditorX();

  // Create a Cloudinary instance and set your cloud name.

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
      Image.configure({
        resize: {
          enabled: true,
          directions: ["top", "bottom", "left", "right"], // can be any direction or diagonal combination
          minWidth: 50,
          minHeight: 50,
          alwaysPreserveAspectRatio: true,
        },
      }),
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const $firstHeading = editor.$node("heading", { level: 1 });
    const title = $firstHeading?.textContent.trim();

    const $images = editor.$nodes("image");
    console.log($images);
    if (!$images)
      throw new Error("A image must be at least one for featured image");

    // upload fetaured first

    const formData = new FormData(e.currentTarget)
    const processNode = async (nodes: NodePos[] | null) => {
      if (!nodes) return;
      const filtered = nodes?.filter((node) =>
        node.attributes.src.startsWith("blob:"),
      );
      try {
        await Promise.all(
          filtered.map(
            async (img) =>
              (img.attributes.src = await uploadToCloudinary(
                img.attributes.src,
                img.attributes.title,
              )),
          ),
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error.response?.data);
          console.error(error.request);
        }
        console.error(error);
      }
    };
    await processNode($images);
    const $img = editor.$node("image");
    const featuredUrl = $img?.attributes.src
    console.log($img?.attributes);

    if ($img) editor.commands.deleteRange($img.range);

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
        published: publish,
      });
    } else {
      result = ZCreate.safeParse({
        title,
        content: editor.getHTML(),
        published: publish,
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

  const handlePublish = (publish: boolean = false) => setPublish(publish);

  console.log("block-state-2:", blocker);

  return (
    <form onSubmit={handleSubmit} className={styles.base}>
      <div className="form-group">
        <label htmlFor="image">Upload Image</label>
        <input type="file" name="image" id={"image"} accept="image/*" />
        CloudinaryUploadWidget
      </div>
      <div className={styles.editor}>
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
    </form>
  );
}
