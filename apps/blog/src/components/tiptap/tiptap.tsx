import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { Button } from "@blog/ui";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import { MarkButton } from "../tiptap-ui/mark-button";
import styles from "./tiptap.module.css";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "<p>Hello World!</p>", // initial content
  });

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      <div className={styles.base}>
        <EditorContent editor={editor} className={styles.editor} />

        <Toolbar variant="fixed">
          <ToolbarGroup>
            <MarkButton
              editor={editor}
              type="bold"
              
              hideWhenUnavailable={true}
              
              onToggled={() => console.log("Mark toggled!")}
            />

            <MarkButton type="italic" />
            <MarkButton type="strike" />
            <MarkButton type="underline" />
          </ToolbarGroup>
          <ToolbarSeparator />

          <Spacer />

          <ToolbarGroup>
            <Button variant={"primary"}>Save</Button>
          </ToolbarGroup>
        </Toolbar>
      </div>
    </EditorContext.Provider>
  );
};

export default Tiptap;
