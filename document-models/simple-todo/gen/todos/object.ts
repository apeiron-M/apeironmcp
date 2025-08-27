import { BaseDocumentClass } from "document-model";
import {
  type AddTodoInput,
  type UpdateTodoInput,
  type CompleteTodoInput,
  type UncompleteTodoInput,
  type DeleteTodoInput,
  type SimpleTodoState,
  type SimpleTodoLocalState,
} from "../types.js";
import {
  addTodo,
  updateTodo,
  completeTodo,
  uncompleteTodo,
  deleteTodo,
} from "./creators.js";
import { type SimpleTodoAction } from "../actions.js";

export default class SimpleTodo_Todos extends BaseDocumentClass<
  SimpleTodoState,
  SimpleTodoLocalState,
  SimpleTodoAction
> {
  public addTodo(input: AddTodoInput) {
    return this.dispatch(addTodo(input));
  }

  public updateTodo(input: UpdateTodoInput) {
    return this.dispatch(updateTodo(input));
  }

  public completeTodo(input: CompleteTodoInput) {
    return this.dispatch(completeTodo(input));
  }

  public uncompleteTodo(input: UncompleteTodoInput) {
    return this.dispatch(uncompleteTodo(input));
  }

  public deleteTodo(input: DeleteTodoInput) {
    return this.dispatch(deleteTodo(input));
  }
}
