import { EditorContent, useCurrentEditor } from "@tiptap/react";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";
import { Button } from "@blog/ui";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import { MarkButton } from "../tiptap-ui/mark-button";
import styles from "./tiptap.module.css";

const Editor = () => {
  const { editor } = useCurrentEditor();

  return (
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
          <Button variant={"primary"} type="submit">
            Save
          </Button>
        </ToolbarGroup>
      </Toolbar>
    </div>
  );
};

export default Editor;
