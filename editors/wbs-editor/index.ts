import type { EditorModule } from "document-model";
import Editor from "./editor.js";
import type { WorkBreakdownStructureDocument } from "../../document-models/work-breakdown-structure/gen/index.js";

export const module: EditorModule = {
  Component: Editor,
  documentTypes: ["work-breakdown-structure"],
  config: {
    id: "wbs-editor",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;