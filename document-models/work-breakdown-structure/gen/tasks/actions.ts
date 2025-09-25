import { type Action } from "document-model";
import type {
  CreateTaskInput,
  UpdateTaskInput,
  MoveTaskInput,
  DeleteTaskInput,
} from "../types.js";

export type CreateTaskAction = Action & {
  type: "CREATE_TASK";
  input: CreateTaskInput;
};
export type UpdateTaskAction = Action & {
  type: "UPDATE_TASK";
  input: UpdateTaskInput;
};
export type MoveTaskAction = Action & {
  type: "MOVE_TASK";
  input: MoveTaskInput;
};
export type DeleteTaskAction = Action & {
  type: "DELETE_TASK";
  input: DeleteTaskInput;
};

export type WorkBreakdownStructureTasksAction =
  | CreateTaskAction
  | UpdateTaskAction
  | MoveTaskAction
  | DeleteTaskAction;
