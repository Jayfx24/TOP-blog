import EditorService from "../../../StudioService";

interface IUseEditorQuery {
  queryFn: () => void;
}

export function useEditorQuery({ queryFn }: IUseEditorQuery) {}
