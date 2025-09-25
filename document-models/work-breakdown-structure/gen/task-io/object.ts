import { BaseDocumentClass } from "document-model";
import {
  type AddTaskInputInput,
  type AddTaskOutputInput,
  type RemoveTaskInputInput,
  type RemoveTaskOutputInput,
  type WorkBreakdownStructureState,
  type WorkBreakdownStructureLocalState,
} from "../types.js";
import {
  addTaskInput,
  addTaskOutput,
  removeTaskInput,
  removeTaskOutput,
} from "./creators.js";
import { type WorkBreakdownStructureAction } from "../actions.js";

export default class WorkBreakdownStructure_TaskIo extends BaseDocumentClass<
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureAction
> {
  public addTaskInput(input: AddTaskInputInput) {
    return this.dispatch(addTaskInput(input));
  }

  public addTaskOutput(input: AddTaskOutputInput) {
    return this.dispatch(addTaskOutput(input));
  }

  public removeTaskInput(input: RemoveTaskInputInput) {
    return this.dispatch(removeTaskInput(input));
  }

  public removeTaskOutput(input: RemoveTaskOutputInput) {
    return this.dispatch(removeTaskOutput(input));
  }
}
