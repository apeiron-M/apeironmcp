import { createAction } from "document-model";
import {
  z,
  type AddTodoInput,
  type UpdateTodoInput,
  type CompleteTodoInput,
  type UncompleteTodoInput,
  type DeleteTodoInput,
} from "../types.js";
import {
  type AddTodoAction,
  type UpdateTodoAction,
  type CompleteTodoAction,
  type UncompleteTodoAction,
  type DeleteTodoAction,
} from "./actions.js";

export const addTodo = (input: AddTodoInput) =>
  createAction<AddTodoAction>(
    "ADD_TODO",
    { ...input },
    undefined,
    z.AddTodoInputSchema,
    "global",
  );

export const updateTodo = (input: UpdateTodoInput) =>
  createAction<UpdateTodoAction>(
    "UPDATE_TODO",
    { ...input },
    undefined,
    z.UpdateTodoInputSchema,
    "global",
  );

export const completeTodo = (input: CompleteTodoInput) =>
  createAction<CompleteTodoAction>(
    "COMPLETE_TODO",
    { ...input },
    undefined,
    z.CompleteTodoInputSchema,
    "global",
  );

export const uncompleteTodo = (input: UncompleteTodoInput) =>
  createAction<UncompleteTodoAction>(
    "UNCOMPLETE_TODO",
    { ...input },
    undefined,
    z.UncompleteTodoInputSchema,
    "global",
  );

export const deleteTodo = (input: DeleteTodoInput) =>
  createAction<DeleteTodoAction>(
    "DELETE_TODO",
    { ...input },
    undefined,
    z.DeleteTodoInputSchema,
    "global",
  );
