import { createAction } from "document-model";
import {
  z,
  type AddTaskInputInput,
  type AddTaskOutputInput,
  type RemoveTaskInputInput,
  type RemoveTaskOutputInput,
} from "../types.js";
import {
  type AddTaskInputAction,
  type AddTaskOutputAction,
  type RemoveTaskInputAction,
  type RemoveTaskOutputAction,
} from "./actions.js";

export const addTaskInput = (input: AddTaskInputInput) =>
  createAction<AddTaskInputAction>(
    "ADD_TASK_INPUT",
    { ...input },
    undefined,
    z.AddTaskInputInputSchema,
    "global",
  );

export const addTaskOutput = (input: AddTaskOutputInput) =>
  createAction<AddTaskOutputAction>(
    "ADD_TASK_OUTPUT",
    { ...input },
    undefined,
    z.AddTaskOutputInputSchema,
    "global",
  );

export const removeTaskInput = (input: RemoveTaskInputInput) =>
  createAction<RemoveTaskInputAction>(
    "REMOVE_TASK_INPUT",
    { ...input },
    undefined,
    z.RemoveTaskInputInputSchema,
    "global",
  );

export const removeTaskOutput = (input: RemoveTaskOutputInput) =>
  createAction<RemoveTaskOutputAction>(
    "REMOVE_TASK_OUTPUT",
    { ...input },
    undefined,
    z.RemoveTaskOutputInputSchema,
    "global",
  );
