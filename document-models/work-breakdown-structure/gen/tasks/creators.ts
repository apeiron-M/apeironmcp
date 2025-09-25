import { createAction } from "document-model";
import {
  z,
  type CreateTaskInput,
  type UpdateTaskInput,
  type MoveTaskInput,
  type DeleteTaskInput,
} from "../types.js";
import {
  type CreateTaskAction,
  type UpdateTaskAction,
  type MoveTaskAction,
  type DeleteTaskAction,
} from "./actions.js";

export const createTask = (input: CreateTaskInput) =>
  createAction<CreateTaskAction>(
    "CREATE_TASK",
    { ...input },
    undefined,
    z.CreateTaskInputSchema,
    "global",
  );

export const updateTask = (input: UpdateTaskInput) =>
  createAction<UpdateTaskAction>(
    "UPDATE_TASK",
    { ...input },
    undefined,
    z.UpdateTaskInputSchema,
    "global",
  );

export const moveTask = (input: MoveTaskInput) =>
  createAction<MoveTaskAction>(
    "MOVE_TASK",
    { ...input },
    undefined,
    z.MoveTaskInputSchema,
    "global",
  );

export const deleteTask = (input: DeleteTaskInput) =>
  createAction<DeleteTaskAction>(
    "DELETE_TASK",
    { ...input },
    undefined,
    z.DeleteTaskInputSchema,
    "global",
  );
