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
import { useCallback, useEffect, useRef, useState } from "react";
import { Model } from "@/components/Model/model";
import { CircleAlert } from "lucide-react";
import {
  ZPostUpdatePayload,
  type PostResponsePayload,
  type PostUpdatePayload,
} from "@blog/lib";
import { useEditorX } from "./editor-context";
import axios, { AxiosError } from "axios";
import { Input } from "@blog/ui";
import clsx from "clsx";
// BUG: blocker still causes pop up upon action resolving - partially solved
type IEditor = {
  post: PostResponsePayload | null;
  content: Content;
};

const uploadToCloudinary = async (
  src: string,
  title: string,
): Promise<string> => {
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

  return data.secure_url as string;
};

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
/**
 * TODO: feacturedUrl params and url for src on edit
 */
export function EditorForm({ content, post }: IEditor) {
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [publish, setPublish] = useState(false);
  const [featuredUrl, setFeaturedUrl] = useState(post?.featuredUrl);
  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");


  const { isUpdate } = useEditorX();

  // const blocker = useBlocker(
  //   useCallback(() => isDirty && !isSubmitted, [isDirty, isSubmitted]),
  // );
  const blocker = useBlocker(useCallback(() => isDirty, [isDirty]));

  const savedContentRef = useRef(content);

  const editor = useEditor({
    // immediatelyRender: false,
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
      const dirty = editor.getJSON() !== savedContentRef.current;
      setIsDirty(dirty);
    },
  });
  console.log(post?.featuredUrl);
  useEffect(() => {
    if (isSubmitted) {
      if (blocker.state === "blocked") {
        blocker.proceed();
      }
    }
  }, [isSubmitted, blocker]);

   useEffect(() => {
    console.log(featuredUrl)
  }, [featuredUrl]);

  const navigate = useNavigate();

  if (!editor) return;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

  let uploadedFeaturedUrl  ;


    const $images = editor.$nodes("image");
  
    if (!$images)
      throw new Error("A image must be at least one for featured image");

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image");
  

    if (imageFile instanceof File && imageFile.size > 0) {
      //uncomment to upload to cloundinary
      // will override post?.featuredUrl if in update-mode
      const src = URL.createObjectURL(imageFile);
      const link = await uploadToCloudinary(src, imageFile.name);
      setFeaturedUrl(link);
      uploadedFeaturedUrl = link
      console.log(src);
      
    }

    // await processNode($images);

   
    let result;
    console.log(featuredUrl);
    if (isUpdate) {
      result = ZPostUpdatePayload.safeParse({
        id: post?.id,
        title,
        content: editor.getJSON(),
        published: publish,
        excerpt,
      });
    } else {
      result = ZCreate.safeParse({
        title,
        content: editor.getJSON(),
        published: publish,
        featuredUrl: uploadedFeaturedUrl,
        excerpt,
      });
    }

    if (!result.success) {
      const errMap = result.error;
      return console.error(errMap.issues);
    }

    const data = isUpdate
      ? await StudioService.updatePost(result.data as PostUpdatePayload)
      : await StudioService.createPost(result.data as TCreate);

    setIsSubmitted(true);

    savedContentRef.current = editor.getJSON();

    console.log(data);
    return navigate(`/posts`);
  };

  const handlePublish = (publish: boolean = false) => setPublish(publish);

  return (
    <form onSubmit={handleSubmit} className={styles.base}>
      <div className={clsx(styles.meta, "wrapper column")}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="excerpt">excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" name="image" id={"image"} accept="image/*" />
        </div>
        {post?.featuredUrl && (
          <div className="">
            <span>Current featured image</span>
            <img src={post?.featuredUrl} alt="" className={styles.img} />
          </div>
        )}
      </div>
      <div className={styles.editor}>
        <SimpleEditor
          editor={editor}
          handlePublish={handlePublish}
          isDirty={isDirty}
        />
        {blocker.state === "blocked" && !isSubmitted && (
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
