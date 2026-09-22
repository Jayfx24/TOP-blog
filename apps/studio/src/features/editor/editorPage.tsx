import { EditorForm } from "./components/editorForm/editorForm";

// interface IEditorForm {
//   e: React.MouseEvent<HTMLFormElement>;
//   content: Content;
//   publish?: boolean;
// }

// const ZPostInput = z.object({
//   tit
// })

// z.config({customError:createErrorMap({displayInvalidFormatDetails:true})})
export function EditorPage() {
  return (
    <section>
      <EditorForm />
    </section>
  );
}
