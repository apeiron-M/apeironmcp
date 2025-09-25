import { BaseDocumentClass } from "document-model";
import {
  type CreateTaskInput,
  type UpdateTaskInput,
  type MoveTaskInput,
  type DeleteTaskInput,
  type WorkBreakdownStructureState,
  type WorkBreakdownStructureLocalState,
} from "../types.js";
import { createTask, updateTask, moveTask, deleteTask } from "./creators.js";
import { type WorkBreakdownStructureAction } from "../actions.js";

export default class WorkBreakdownStructure_Tasks extends BaseDocumentClass<
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureAction
> {
  public createTask(input: CreateTaskInput) {
    return this.dispatch(createTask(input));
  }

  public updateTask(input: UpdateTaskInput) {
    return this.dispatch(updateTask(input));
  }

  public moveTask(input: MoveTaskInput) {
    return this.dispatch(moveTask(input));
  }

  public deleteTask(input: DeleteTaskInput) {
    return this.dispatch(deleteTask(input));
  }
}
