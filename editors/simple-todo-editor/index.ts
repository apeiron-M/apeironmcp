import type { EditorModule } from "document-model";
import Editor from "./editor.js";
import type { SimpleTodoDocument } from "../../document-models/simple-todo/index.js";

export const module: EditorModule = {
  Component: Editor,
  documentTypes: ["simple-todo"],
  config: {
    id: "simple-todo-editor",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
