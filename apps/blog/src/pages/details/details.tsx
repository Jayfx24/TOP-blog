// import type { PostsWithAuthor } from "@blog/lib";
import { useLoaderData, useNavigate } from "react-router";
import { detailsLoader } from "../../loaders";
import styles from "./details.module.css";
import { CommentEditor } from "@/components/comment-editor/comment-editor";
import { CommentCard } from "@/components/comment-card/comment-card";
import { Separator } from "@/components/separator/separator";
import { Button } from "@blog/ui";
import { ChevronLeft } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { PostsWithAuthorAndComment } from "@blog/lib";
;
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { FindAndReplace } from "@tiptap/extension-find-and-replace";
import { Selection } from "@tiptap/extensions";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

export function Details() { 
  const article: PostsWithAuthorAndComment =
    useLoaderData<typeof detailsLoader>();
  const navigate = useNavigate();

  // if (!article) return

  const editor = useEditor({
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
    ], // define your extension array
    content: article.content as JSONContent,
    editable: false,
    // initial content
  });

  // const providerValue = useMemo(() => {
  //   return { editor };
  // }, [editor]);

  if (!editor) {
    return null;
  }

  
  ;

  return (
    <section>
      <div className="wrapper">
        <Button
          className={styles.badge}
          variant={"minimal"}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={14} />
          Back to journal{" "}
        </Button>
        <h1 className={styles.title}>{article.title}</h1>
        <ul className={styles.meta}>
          <li className="author">
            <p className={styles.label}>Written By</p>
            <span className={styles.value}>
              {article.author.firstName + " " + article.author.lastName}
            </span>
          </li>
          <li className="published">
            <p>Published</p>
            <span className={styles.value}>
               {new Date(article.updatedAt)?.toDateString()}
            </span>
          </li>
        </ul>
      </div>

      <div className={styles.imgWrapper}>
        <img
          src={article.featuredUrl ?? "https://placehold.co/1250x628"}
          alt=""
        />
      </div>
      <div className="wrapper">
        <EditorContent editor={editor} readOnly={true} />
        {/* {article.content}</div> */}

        <div className={styles.comment}>
          <Separator />
          <ErrorBoundary fallback={<p>Could not add comment</p>}>
            <CommentEditor postId={article.id} />
          </ErrorBoundary>
          <Separator />
          <div className={styles.views}>
            <div className={styles.header}>
              <h2>Comments </h2>
              <p>
                In this section you can contribute and read other readers
                comment on this article
              </p>
            </div>
            <ul className={styles.commentList}>
              {/*  */}
              {article.comments?.map((comment) => (
                <li key={comment.id} id="">
                  <CommentCard comment={comment} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
