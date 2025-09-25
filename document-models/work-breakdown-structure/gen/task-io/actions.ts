import { type Action } from "document-model";
import type {
  AddTaskInputInput,
  AddTaskOutputInput,
  RemoveTaskInputInput,
  RemoveTaskOutputInput,
} from "../types.js";

export type AddTaskInputAction = Action & {
  type: "ADD_TASK_INPUT";
  input: AddTaskInputInput;
};
export type AddTaskOutputAction = Action & {
  type: "ADD_TASK_OUTPUT";
  input: AddTaskOutputInput;
};
export type RemoveTaskInputAction = Action & {
  type: "REMOVE_TASK_INPUT";
  input: RemoveTaskInputInput;
};
export type RemoveTaskOutputAction = Action & {
  type: "REMOVE_TASK_OUTPUT";
  input: RemoveTaskOutputInput;
};

export type WorkBreakdownStructureTaskIoAction =
  | AddTaskInputAction
  | AddTaskOutputAction
  | RemoveTaskInputAction
  | RemoveTaskOutputAction;
