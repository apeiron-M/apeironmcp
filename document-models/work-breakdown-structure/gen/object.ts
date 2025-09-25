import {
  BaseDocumentClass,
  type BaseStateFromDocument,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type WorkBreakdownStructureState,
  type WorkBreakdownStructureLocalState,
  type WorkBreakdownStructureDocument,
} from "./types.js";
import { type WorkBreakdownStructureAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import WorkBreakdownStructure_Core from "./core/object.js";
import WorkBreakdownStructure_Tasks from "./tasks/object.js";
import WorkBreakdownStructure_TaskIo from "./task-io/object.js";
import WorkBreakdownStructure_Team from "./team/object.js";
import WorkBreakdownStructure_Deliverables from "./deliverables/object.js";

export * from "./core/object.js";
export * from "./tasks/object.js";
export * from "./task-io/object.js";
export * from "./team/object.js";
export * from "./deliverables/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface WorkBreakdownStructure
  extends WorkBreakdownStructure_Core,
    WorkBreakdownStructure_Tasks,
    WorkBreakdownStructure_TaskIo,
    WorkBreakdownStructure_Team,
    WorkBreakdownStructure_Deliverables {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class WorkBreakdownStructure extends BaseDocumentClass<
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureAction
> {
  static fileExtension = "wbs";

  constructor(
    initialState?: Partial<
      BaseStateFromDocument<WorkBreakdownStructureDocument>
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, WorkBreakdownStructure.fileExtension, name);
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(WorkBreakdownStructure, [
  WorkBreakdownStructure_Core,
  WorkBreakdownStructure_Tasks,
  WorkBreakdownStructure_TaskIo,
  WorkBreakdownStructure_Team,
  WorkBreakdownStructure_Deliverables,
]);

export { WorkBreakdownStructure };
