import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import content from "@/components/tiptap-templates/simple/data/content.json";


export function Editor() {
  return (
    <section>
      <SimpleEditor content={content} />
    </section>
  );
}
