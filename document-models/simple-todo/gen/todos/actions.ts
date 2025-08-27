import { type Action } from "document-model";
import type {
  AddTodoInput,
  UpdateTodoInput,
  CompleteTodoInput,
  UncompleteTodoInput,
  DeleteTodoInput,
} from "../types.js";

export type AddTodoAction = Action & { type: "ADD_TODO"; input: AddTodoInput };
export type UpdateTodoAction = Action & {
  type: "UPDATE_TODO";
  input: UpdateTodoInput;
};
export type CompleteTodoAction = Action & {
  type: "COMPLETE_TODO";
  input: CompleteTodoInput;
};
export type UncompleteTodoAction = Action & {
  type: "UNCOMPLETE_TODO";
  input: UncompleteTodoInput;
};
export type DeleteTodoAction = Action & {
  type: "DELETE_TODO";
  input: DeleteTodoInput;
};

export type SimpleTodoTodosAction =
  | AddTodoAction
  | UpdateTodoAction
  | CompleteTodoAction
  | UncompleteTodoAction
  | DeleteTodoAction;
