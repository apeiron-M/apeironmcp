// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { type SimpleTodoDocument, z } from "./types.js";

import { reducer as TodosReducer } from "../src/reducers/todos.js";

const stateReducer: StateReducer<SimpleTodoDocument> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "ADD_TODO":
      z.AddTodoInputSchema().parse(action.input);
      TodosReducer.addTodoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_TODO":
      z.UpdateTodoInputSchema().parse(action.input);
      TodosReducer.updateTodoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "COMPLETE_TODO":
      z.CompleteTodoInputSchema().parse(action.input);
      TodosReducer.completeTodoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UNCOMPLETE_TODO":
      z.UncompleteTodoInputSchema().parse(action.input);
      TodosReducer.uncompleteTodoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_TODO":
      z.DeleteTodoInputSchema().parse(action.input);
      TodosReducer.deleteTodoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<SimpleTodoDocument>(stateReducer);
