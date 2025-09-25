/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect, beforeEach } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type CreateTaskInput,
  type UpdateTaskInput,
  type MoveTaskInput,
  type DeleteTaskInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/tasks/creators.js";
import type { WorkBreakdownStructureDocument } from "../../gen/types.js";

describe("Tasks Operations", () => {
  let document: WorkBreakdownStructureDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle createTask operation", () => {
    const input: CreateTaskInput = generateMock(z.CreateTaskInputSchema());

    const updatedDocument = reducer(document, creators.createTask(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CREATE_TASK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateTask operation", () => {
    const input: UpdateTaskInput = generateMock(z.UpdateTaskInputSchema());

    const updatedDocument = reducer(document, creators.updateTask(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TASK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle moveTask operation", () => {
    const input: MoveTaskInput = generateMock(z.MoveTaskInputSchema());

    const updatedDocument = reducer(document, creators.moveTask(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("MOVE_TASK");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteTask operation", () => {
    const input: DeleteTaskInput = generateMock(z.DeleteTaskInputSchema());

    const updatedDocument = reducer(document, creators.deleteTask(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_TASK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
