import { useLocation } from "react-router";
import { EditorForm } from "./components/editor/editor";
// import defaultContent from "@/components/tiptap-templates/simple/data/content.json";
import type { Content } from "@tiptap/core";
import type { PostResponsePayload } from "@blog/lib";
import { EditorContext } from "./components/editor/editor-context";

export function EditorPage() {
  const location = useLocation();

  const post: PostResponsePayload | null = location.state?.post ?? null;

  const isUpdate = !!post?.id;

  const content: Content = (post?.content as Content) ?? {};
  // EditorContext
  return (
    <EditorContext value={{ isUpdate, isPublished: post?.published ?? false }}>
      <EditorForm content={content}  post={post}/>
    </EditorContext>
  );
}
