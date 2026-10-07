import { useLocation } from "react-router";
import { EditorForm } from "./components/editor/editor";
import defaultContent from "@/components/tiptap-templates/simple/data/content.json";
import type { Content } from "@tiptap/core";
import type { PostResponsePayload } from "@blog/lib";

export function EditorPage() {
  const location = useLocation();

  const post: PostResponsePayload | null = location.state?.post ?? null;
  const content: Content = (post?.content as Content) ?? defaultContent;

  return (
    <section>
      <EditorForm content={content} />
    </section>
  );
}
