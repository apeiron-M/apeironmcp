/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type AddTodoInput,
  type UpdateTodoInput,
  type CompleteTodoInput,
  type UncompleteTodoInput,
  type DeleteTodoInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/todos/creators.js";
import type { SimpleTodoDocument } from "../../gen/types.js";

describe("Todos Operations", () => {
  let document: SimpleTodoDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addTodo operation", () => {
    const input: AddTodoInput = generateMock(z.AddTodoInputSchema());

    const updatedDocument = reducer(document, creators.addTodo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_TODO");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateTodo operation", () => {
    const input: UpdateTodoInput = generateMock(z.UpdateTodoInputSchema());

    const updatedDocument = reducer(document, creators.updateTodo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TODO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle completeTodo operation", () => {
    const input: CompleteTodoInput = generateMock(z.CompleteTodoInputSchema());

    const updatedDocument = reducer(document, creators.completeTodo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "COMPLETE_TODO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle uncompleteTodo operation", () => {
    const input: UncompleteTodoInput = generateMock(
      z.UncompleteTodoInputSchema(),
    );

    const updatedDocument = reducer(document, creators.uncompleteTodo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UNCOMPLETE_TODO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteTodo operation", () => {
    const input: DeleteTodoInput = generateMock(z.DeleteTodoInputSchema());

    const updatedDocument = reducer(document, creators.deleteTodo(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_TODO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
