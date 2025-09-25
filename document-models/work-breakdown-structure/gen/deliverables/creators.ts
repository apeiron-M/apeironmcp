import { createAction } from "document-model";
import {
  z,
  type CreateDeliverableInput,
  type UpdateDeliverableInput,
  type DeleteDeliverableInput,
  type AssignTasksToDeliverableInput,
} from "../types.js";
import {
  type CreateDeliverableAction,
  type UpdateDeliverableAction,
  type DeleteDeliverableAction,
  type AssignTasksToDeliverableAction,
} from "./actions.js";

export const createDeliverable = (input: CreateDeliverableInput) =>
  createAction<CreateDeliverableAction>(
    "CREATE_DELIVERABLE",
    { ...input },
    undefined,
    z.CreateDeliverableInputSchema,
    "global",
  );

export const updateDeliverable = (input: UpdateDeliverableInput) =>
  createAction<UpdateDeliverableAction>(
    "UPDATE_DELIVERABLE",
    { ...input },
    undefined,
    z.UpdateDeliverableInputSchema,
    "global",
  );

export const deleteDeliverable = (input: DeleteDeliverableInput) =>
  createAction<DeleteDeliverableAction>(
    "DELETE_DELIVERABLE",
    { ...input },
    undefined,
    z.DeleteDeliverableInputSchema,
    "global",
  );

export const assignTasksToDeliverable = (
  input: AssignTasksToDeliverableInput,
) =>
  createAction<AssignTasksToDeliverableAction>(
    "ASSIGN_TASKS_TO_DELIVERABLE",
    { ...input },
    undefined,
    z.AssignTasksToDeliverableInputSchema,
    "global",
  );
