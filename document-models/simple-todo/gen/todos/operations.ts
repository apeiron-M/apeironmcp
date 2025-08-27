import { type SignalDispatch } from "document-model";
import {
  type AddTodoAction,
  type UpdateTodoAction,
  type CompleteTodoAction,
  type UncompleteTodoAction,
  type DeleteTodoAction,
} from "./actions.js";
import { type SimpleTodoState } from "../types.js";

export interface SimpleTodoTodosOperations {
  addTodoOperation: (
    state: SimpleTodoState,
    action: AddTodoAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTodoOperation: (
    state: SimpleTodoState,
    action: UpdateTodoAction,
    dispatch?: SignalDispatch,
  ) => void;
  completeTodoOperation: (
    state: SimpleTodoState,
    action: CompleteTodoAction,
    dispatch?: SignalDispatch,
  ) => void;
  uncompleteTodoOperation: (
    state: SimpleTodoState,
    action: UncompleteTodoAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteTodoOperation: (
    state: SimpleTodoState,
    action: DeleteTodoAction,
    dispatch?: SignalDispatch,
  ) => void;
}
