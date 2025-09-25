import {
  type DocumentModelUtils,
  baseCreateDocument,
  baseSaveToFile,
  baseSaveToFileHandle,
  baseLoadFromFile,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model";
import {
  type WorkBreakdownStructureDocument,
  type WorkBreakdownStructureState,
  type WorkBreakdownStructureLocalState,
} from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: WorkBreakdownStructureState = {
  id: "",
  title: "",
  description: "",
  deliverables: [],
  tasks: [],
  teamMembers: [],
  createdAt: "",
  updatedAt: null,
};
export const initialLocalState: WorkBreakdownStructureLocalState = {};

const utils: DocumentModelUtils<WorkBreakdownStructureDocument> = {
  fileExtension: "wbs",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = "work-breakdown-structure";

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFile(document, path, name) {
    return baseSaveToFile(document, path, "wbs", name);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromFile(path) {
    return baseLoadFromFile(path, reducer);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFile = utils.saveToFile;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromFile = utils.loadFromFile;
export const loadFromInput = utils.loadFromInput;

export default utils;
