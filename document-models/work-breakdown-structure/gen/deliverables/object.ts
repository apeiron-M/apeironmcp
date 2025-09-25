import { BaseDocumentClass } from "document-model";
import {
  type CreateDeliverableInput,
  type UpdateDeliverableInput,
  type DeleteDeliverableInput,
  type AssignTasksToDeliverableInput,
  type WorkBreakdownStructureState,
  type WorkBreakdownStructureLocalState,
} from "../types.js";
import {
  createDeliverable,
  updateDeliverable,
  deleteDeliverable,
  assignTasksToDeliverable,
} from "./creators.js";
import { type WorkBreakdownStructureAction } from "../actions.js";

export default class WorkBreakdownStructure_Deliverables extends BaseDocumentClass<
  WorkBreakdownStructureState,
  WorkBreakdownStructureLocalState,
  WorkBreakdownStructureAction
> {
  public createDeliverable(input: CreateDeliverableInput) {
    return this.dispatch(createDeliverable(input));
  }

  public updateDeliverable(input: UpdateDeliverableInput) {
    return this.dispatch(updateDeliverable(input));
  }

  public deleteDeliverable(input: DeleteDeliverableInput) {
    return this.dispatch(deleteDeliverable(input));
  }

  public assignTasksToDeliverable(input: AssignTasksToDeliverableInput) {
    return this.dispatch(assignTasksToDeliverable(input));
  }
}
