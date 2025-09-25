import { type Action } from "document-model";
import type {
  CreateDeliverableInput,
  UpdateDeliverableInput,
  DeleteDeliverableInput,
  AssignTasksToDeliverableInput,
} from "../types.js";

export type CreateDeliverableAction = Action & {
  type: "CREATE_DELIVERABLE";
  input: CreateDeliverableInput;
};
export type UpdateDeliverableAction = Action & {
  type: "UPDATE_DELIVERABLE";
  input: UpdateDeliverableInput;
};
export type DeleteDeliverableAction = Action & {
  type: "DELETE_DELIVERABLE";
  input: DeleteDeliverableInput;
};
export type AssignTasksToDeliverableAction = Action & {
  type: "ASSIGN_TASKS_TO_DELIVERABLE";
  input: AssignTasksToDeliverableInput;
};

export type WorkBreakdownStructureDeliverablesAction =
  | CreateDeliverableAction
  | UpdateDeliverableAction
  | DeleteDeliverableAction
  | AssignTasksToDeliverableAction;
