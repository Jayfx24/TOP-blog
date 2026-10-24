import { createContext, useContext } from "react";

type TEditor = {
  isUpdate: boolean;
  isPublished: boolean;
};

export const EditorContext = createContext<TEditor>({
  isUpdate: false,
  isPublished: false,
});

export const useEditorX = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context
};
